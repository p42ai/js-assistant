
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  isSideEffectFree,
  NodeRange,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertComparisonChainToArrayIncludesCandidate } from "./ConvertComparisonChainToArrayIncludesCandidate";

export class ConvertComparisonChainToArrayIncludesTransformation extends Transformation<ConvertComparisonChainToArrayIncludesCandidate> {
  async apply(
    match: ConvertComparisonChainToArrayIncludesCandidate,
    tree: TransformedNodeTree
  ) {
    const includesCall = tree.createCallExpression({
      expression: tree.createPropertyAccessExpression({
        expression: tree.createArrayLiteralExpression({
          elements: match.captures.values.map((node) => tree.copy(node)),
        }),
        name: tree.createIdentifier({
          text: "includes",
        }),
      }),
      argumentsArray: [match.captures.expression],
    });

    tree.replace(
      match.node,
      match.captures.isNegated
        ? tree.createPrefixUnaryExpression({
            operator: ts.SyntaxKind.ExclamationToken,
            operand: includesCall,
          })
        : includesCall
    );
  }

  analyzeSafety(match: ConvertComparisonChainToArrayIncludesCandidate): Safety {
    const messages = new SafetyMessageList();

    if (
      match.captures.values.length >= 2 &&
      !isSideEffectFree(match.captures.expression, match.context)
    ) {
      messages.warning("evaluates expression only once");
    }

    return messages.produceSafe();
  }

  getSuggestion(
    match: ConvertComparisonChainToArrayIncludesCandidate,
    safety: Safety
  ): Suggestion | null {
    if (match.captures.values.length < 3) {
      return null;
    }

    return {
      description: `You can convert the string comparison chain to '${
        match.captures.isNegated ? "!" : ""
      }array.includes'.`,
      shortActionLabel: "Convert",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ConvertComparisonChainToArrayIncludesCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      `Convert to ${match.captures.isNegated ? "!" : ""}[].includes()`,
      [
        {
          range: NodeRange.node(match.node),
          level: isSuggestion
            ? CodeAssistLevel.Suggestion
            : match.captures.values.length >= 2
            ? CodeAssistLevel.QuickFix
            : CodeAssistLevel.Regular,
        },
      ]
    );
  }
}
