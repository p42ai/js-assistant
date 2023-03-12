
import {
  ActionZone,
  CodeAssistLevel,
  containsComments,
  createActionZones,
  isSideEffectFree,
  NodeRange,
  Range,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { RemoveEmptyIfBlockCandidate } from "./RemoveEmptyIfBlockCandidate";

export class RemoveEmptyIfBlockTransformation extends Transformation<RemoveEmptyIfBlockCandidate> {
  async apply(match: RemoveEmptyIfBlockCandidate, tree: TransformedNodeTree) {
    const ifStatement = match.node;
    const { elseStatement } = ifStatement;

    if (elseStatement == null) {
      tree.remove(ifStatement);
      return;
    }

    // create block if else statement is not a block already
    const replacement = ts.isBlock(elseStatement)
      ? elseStatement
      : tree.createBlock({ statements: [elseStatement] });

    tree.replace(
      ifStatement,
      tree.updateIfStatement(ifStatement, {
        expression: tree.createPrefixUnaryExpression({
          operator: ts.SyntaxKind.ExclamationToken,
          operand: ifStatement.expression,
        }),
        thenStatement: replacement,
        elseStatement: null,
      })
    );
  }

  analyzeSafety(match: RemoveEmptyIfBlockCandidate): Safety {
    const messages = new SafetyMessageList();

    const condition = match.node.expression;

    if (
      match.node.elseStatement == null &&
      !isSideEffectFree(condition, match.context)
    ) {
      messages.warning("condition could have side-effects");
    }

    if (containsComments(match.captures.thenBlock)) {
      messages.information("if contains comments");
    }

    return messages.produceSafe();
  }

  getSuggestion(
    match: RemoveEmptyIfBlockCandidate,
    safety: Safety
  ): Suggestion | null {
    if (containsComments(match.captures.thenBlock)) {
      return null;
    }

    return {
      description:
        match.node.elseStatement == null
          ? "You can remove the empty if statement."
          : "You can invert if statement and remove the empty block.",
      shortActionLabel: match.node.elseStatement == null ? "Remove" : "Invert",
      highlightRanges: [
        new Range(match.node.getStart(), match.captures.thenBlock.end),
      ],
    };
  }

  getActionZones(
    match: RemoveEmptyIfBlockCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    const ifStatement = match.node;
    const thenBlock = ifStatement.thenStatement!;

    return createActionZones(
      match.node.elseStatement == null
        ? "Remove if"
        : "Invert if and remove empty block",
      [
        {
          range: NodeRange.firstCharactersOfNode(thenBlock),
          level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
        },
        {
          range: NodeRange.node(thenBlock),
        },
        {
          range: NodeRange.ifStatementIfKeyword(ifStatement),
        },
      ]
    );
  }
}
