
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
import { ConvertApplyToSpreadSyntaxCandidate } from "./ConvertApplyToSpreadSyntaxCandidate";

export class ConvertApplyToSpreadSyntaxTransformation extends Transformation<ConvertApplyToSpreadSyntaxCandidate> {
  async apply(
    match: ConvertApplyToSpreadSyntaxCandidate,
    tree: TransformedNodeTree
  ) {
    const { args } = match.captures;

    tree.replace(
      match.node,
      tree.createCallExpression({
        expression: match.captures.calledExpression,
        argumentsArray: ts.isArrayLiteralExpression(args)
          ? // fn.apply(context, [1, 2, 3]) -> fn(1, 2, 3)
            args.elements.map((element) =>
              ts.isOmittedExpression(element)
                ? tree.createIdentifier({
                    text: "undefined",
                  })
                : element
            )
          : // fn.apply(context, args) -> fn(...args)
            [
              tree.createSpreadElement({
                expression: args,
              }),
            ],
      })
    );
  }

  analyzeSafety(match: ConvertApplyToSpreadSyntaxCandidate): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: ConvertApplyToSpreadSyntaxCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: "You can use spread operator instead of .apply().",
      highlightRanges: [NodeRange.node(match.node)],
      shortActionLabel: "Convert",
    };
  }

  getActionZones(
    match: ConvertApplyToSpreadSyntaxCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Use spread", [
      {
        range: NodeRange.identifier(match.captures.apply),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
