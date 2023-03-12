
import {
  ActionZone,
  CodeAssistLevel,
  containsComments,
  createActionZones,
  IfStatement,
  NodeRange,
  Range,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { RemoveEmptyElseBlockCandidate } from "./RemoveEmptyElseBlockCandidate";

export class RemoveEmptyElseBlockTransformation extends Transformation<RemoveEmptyElseBlockCandidate> {
  async apply(match: RemoveEmptyElseBlockCandidate, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.updateIfStatement(match.node, {
        elseStatement: null,
      })
    );
  }

  analyzeSafety(match: RemoveEmptyElseBlockCandidate) {
    return containsComments(match.captures.elseBlock)
      ? Safety.information("else contains comments")
      : Safety.safe();
  }

  getSuggestion(
    match: RemoveEmptyElseBlockCandidate,
    safety: Safety
  ): Suggestion | null {
    if (!safety.isSafe()) {
      return null;
    }

    return {
      description: "You can remove the empty else block.",
      shortActionLabel: "Remove",
      highlightRanges: [
        new Range(
          IfStatement.getElseKeyword(match.node)!.getStart(),
          match.node.end
        ),
      ],
    };
  }

  getActionZones(
    match: RemoveEmptyElseBlockCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    const ifStatement = match.node;
    const elseBlock = ifStatement.elseStatement!;

    return createActionZones("Remove else", [
      {
        range: NodeRange.firstCharactersOfNode(elseBlock),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.node(elseBlock),
      },
      {
        range: NodeRange.ifStatementIfKeyword(ifStatement),
      },
      {
        range: NodeRange.ifStatementElseKeyword(ifStatement),
      },
    ]);
  }
}
