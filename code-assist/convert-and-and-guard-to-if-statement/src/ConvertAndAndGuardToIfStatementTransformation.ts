import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  PrefixTriviaMove,
  Safety,
  SuffixTriviaMove,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertAndAndGuardToIfStatementCandidate } from "./ConvertAndAndGuardToIfStatementCandidate";

export class ConvertAndAndGuardToIfStatementTransformation extends Transformation<ConvertAndAndGuardToIfStatementCandidate> {
  async apply(
    match: ConvertAndAndGuardToIfStatementCandidate,
    tree: TransformedNodeTree
  ) {
    const ifStatement = tree.createIfStatement({
      expression: match.captures.guard,
      thenStatement: tree.createExpressionStatement({
        expression: match.captures.guardedExpression,
      }),
    });

    tree.replace(match.node, ifStatement);

    // TODO - should this happen by default when replacing nodes?
    tree.updateTrivia(new PrefixTriviaMove(match.node, ifStatement));
    tree.updateTrivia(new SuffixTriviaMove(match.node, ifStatement));
  }

  analyzeSafety() {
    return Safety.safe();
  }

  getSuggestion(
    match: ConvertAndAndGuardToIfStatementCandidate,
    safety: Safety
  ): Suggestion | null {
    const { guard, guardedExpression } = match.captures;

    // direct function call, e.g. f() that is not an optional chaining expression:
    if (
      ts.isCallExpression(guardedExpression) &&
      ts.isIdentifier(guardedExpression.expression)
    ) {
      if (
        ts.isIdentifier(guard) &&
        guard.text === guardedExpression.expression.text
      ) {
        return null;
      }
    } else if (!ts.isBinaryExpression(guardedExpression)) {
      // guarded assignment, e.g. a = b, and other inner binary expressions:
      return null;
    }

    return {
      description: `You can convert the && expression to an if-statement.`,
      highlightRanges: [NodeRange.node(match.node)],
      shortActionLabel: "Convert",
    };
  }

  getActionZones(
    match: ConvertAndAndGuardToIfStatementCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to if", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
