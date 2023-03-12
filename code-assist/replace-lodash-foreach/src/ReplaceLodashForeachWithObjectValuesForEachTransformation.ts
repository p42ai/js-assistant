
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
import { ReplaceLodashForeachCandidate } from "./ReplaceLodashForeachCandidate";

export class ReplaceLodashForeachWithObjectValuesForEachTransformation extends Transformation<ReplaceLodashForeachCandidate> {
  isApplicable(match: ReplaceLodashForeachCandidate): boolean {
    const collectionType = match.data.collectionKind;
    const { parameters } = match.captures.iteratee;
    return collectionType === "object" && parameters.length < 2;
  }

  async apply(match: ReplaceLodashForeachCandidate, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.updateCallExpression(match.node, {
        expression: tree.updatePropertyAccessExpression(
          match.node.expression as ts.PropertyAccessExpression,
          {
            expression: tree.createCallExpression({
              expression: tree.createPropertyAccessExpression({
                name: "values",
                expression: tree.createIdentifier({
                  text: "Object",
                }),
              }),
              argumentsArray: [match.captures.collection],
            }),
            name: tree.createIdentifier({
              text: "forEach",
            }),
          }
        ),
        argumentsArray: match.node.arguments.slice(1),
      })
    );
  }

  analyzeSafety(match: ReplaceLodashForeachCandidate): Safety {
    return Safety.warning("could change behavior for array-like objects");
  }

  getSuggestion(
    match: ReplaceLodashForeachCandidate,
    safety: Safety
  ): Suggestion | null {
    if (!safety.isSafe()) {
      return null;
    }

    return {
      description: `You can replace _.${match.captures.lodashCall.captures.name} (Lodash) with Object.values(…).forEach.`,
      shortActionLabel: "Replace",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ReplaceLodashForeachCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Replace with Object.values(…).forEach", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
