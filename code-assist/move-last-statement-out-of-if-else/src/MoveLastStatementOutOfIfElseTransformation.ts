
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  getBindings,
  isBlockLike,
  isSideEffectFree,
  NodeRange,
  Safety,
  SuffixTriviaMove,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { MoveLastStatementOutOfIfElseCandidate } from "./MoveLastStatementOutOfIfElseCandidate";

export class MoveLastStatementOutOfIfElseTransformation extends Transformation<MoveLastStatementOutOfIfElseCandidate> {
  async apply(
    match: MoveLastStatementOutOfIfElseCandidate,
    tree: TransformedNodeTree
  ) {
    const ifStatement = match.node;
    const movedStatement = match.captures.elseOccurrence;

    if (match.data.isSingleStatementIfElse) {
      tree.replace(
        ifStatement,
        isBlockLike(ifStatement.parent)
          ? movedStatement
          : tree.createBlock({
              statements: [movedStatement],
            })
      );
      return;
    }

    const removeLastStatement = (blockOrStatement: ts.Statement) =>
      ts.isBlock(blockOrStatement)
        ? tree.updateBlock(blockOrStatement, {
            statements: blockOrStatement.statements.slice(
              0,
              blockOrStatement.statements.length - 1
            ),
          })
        : tree.createBlock({ statements: [] });

    const updatedIfStatement = tree.updateIfStatement(ifStatement, {
      thenStatement: removeLastStatement(ifStatement.thenStatement),
      elseStatement: removeLastStatement(ifStatement.elseStatement!),
    });

    if (isBlockLike(ifStatement.parent)) {
      tree.replace(ifStatement, updatedIfStatement);
      tree.insertStatement(
        ifStatement.parent,
        movedStatement,
        ifStatement.parent.statements.indexOf(ifStatement) + 1
      );
    } else {
      tree.replace(
        ifStatement,
        tree.createBlock({
          statements: [updatedIfStatement, movedStatement],
        })
      );
    }

    tree.updateTrivia(new SuffixTriviaMove(ifStatement, movedStatement));
  }

  analyzeSafety(match: MoveLastStatementOutOfIfElseCandidate): Safety {
    const {
      context,
      node: ifStatement,
      captures: { elseOccurrence: statement },
    } = match;

    if (match.data.isSingleStatementIfElse) {
      return isSideEffectFree(ifStatement.expression, context)
        ? Safety.safe()
        : Safety.warning("if-condition can have side-effects");
    }

    const bindings = getBindings(statement, context);
    const ifStatementScope = context.getScope(ifStatement);

    for (const binding of bindings) {
      if (!binding.isAvailableInScope(ifStatementScope)) {
        return Safety.error("used variable not available in outer scope");
      }
    }

    return Safety.safe();
  }

  getSuggestion(
    match: MoveLastStatementOutOfIfElseCandidate,
    safety: Safety
  ): Suggestion | null {
    if (safety.isError()) {
      return null;
    }

    return match.data.isSingleStatementIfElse
      ? {
          description:
            "You can remove the redundant if-else statement and replace it with its content.",
          highlightRanges: [NodeRange.node(match.node)],
        }
      : {
          description:
            "You can move the duplicated last statement below the if-else statement.",
          shortActionLabel: "Move",
          highlightRanges: [
            NodeRange.node(match.captures.thenOccurrence),
            NodeRange.node(match.captures.elseOccurrence),
          ],
        };
  }

  getActionZones(
    match: MoveLastStatementOutOfIfElseCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    const level = CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion);
    return createActionZones(
      match.data.isSingleStatementIfElse
        ? `Remove redundant if-else`
        : `Move below if-else`,
      [
        {
          range: NodeRange.node(match.captures.thenOccurrence),
          level,
        },
        {
          range: NodeRange.node(match.captures.elseOccurrence),
          level,
        },
      ]
    );
  }
}
