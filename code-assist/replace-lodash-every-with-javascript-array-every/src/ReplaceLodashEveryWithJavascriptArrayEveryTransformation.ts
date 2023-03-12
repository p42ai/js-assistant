
import {
  ActionZone,
  createActionZones,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ReplaceLodashEveryWithJavascriptArrayEveryCandidate } from "./ReplaceLodashEveryWithJavascriptArrayEveryCandidate";

export class ReplaceLodashEveryWithJavascriptArrayEveryTransformation extends Transformation<ReplaceLodashEveryWithJavascriptArrayEveryCandidate> {
  async apply(
    match: ReplaceLodashEveryWithJavascriptArrayEveryCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node,
      tree.updateCallExpression(match.node, {
        expression: tree.updatePropertyAccessExpression(
          match.node.expression as ts.PropertyAccessExpression,
          {
            expression: match.node.arguments[0],
          }
        ),
        argumentsArray: match.node.arguments.slice(1),
      })
    );
  }

  analyzeSafety(
    match: ReplaceLodashEveryWithJavascriptArrayEveryCandidate
  ): Safety {
    return Safety.unknown();
  }

  getActionZones(
    match: ReplaceLodashEveryWithJavascriptArrayEveryCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Replace with Array.every", [
      {
        range: NodeRange.node(match.node.expression), // _.every expression
      },
    ]);
  }
}
