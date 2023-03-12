
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
import { UseStringStartsWithCandidate } from "./UseStringStartsWithCandidate";

export class UseStringStartsWithTransformation extends Transformation<UseStringStartsWithCandidate> {
  async apply(match: UseStringStartsWithCandidate, tree: TransformedNodeTree) {
    const callExpression = tree.createCallExpression({
      expression: tree.createPropertyAccessExpression({
        expression: match.captures.targetString,
        name: "startsWith",
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

  analyzeSafety(match: UseStringStartsWithCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: UseStringStartsWithCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description:
        "You can check the first character of a string with 'String.startsWith()'.",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: UseStringStartsWithCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Use String.startWith()", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
