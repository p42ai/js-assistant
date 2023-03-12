
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { UseStringEndsWithCandidate } from "./UseStringEndsWithCandidate";

export class UseStringEndsWithTransformation extends Transformation<UseStringEndsWithCandidate> {
  async apply(match: UseStringEndsWithCandidate, tree: TransformedNodeTree) {
    const callExpression = tree.createCallExpression({
      expression: tree.createPropertyAccessExpression({
        expression: match.captures.targetString,
        name: "endsWith",
      }),
      argumentsArray: [match.captures.testedCharacter] as Array<ts.Expression>,
    });

    tree.replace(
      match.node,
      match.captures.isNegated
        ? tree.createPrefixUnaryExpression({
            operator: ts.SyntaxKind.ExclamationToken,
            operand: callExpression,
          })
        : callExpression
    );
  }

  analyzeSafety(match: UseStringEndsWithCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: UseStringEndsWithCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description:
        "You can check the last character of a string with 'String.endsWith()'.",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: UseStringEndsWithCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Use String.endsWith()", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
