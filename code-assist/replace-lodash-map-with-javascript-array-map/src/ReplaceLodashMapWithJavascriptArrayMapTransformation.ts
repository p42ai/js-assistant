
import {
  ActionZone,
  createActionZones,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ReplaceLodashMapWithJavascriptArrayMapCandidate } from "./ReplaceLodashMapWithJavascriptArrayMapCandidate";

export class ReplaceLodashMapWithJavascriptArrayMapTransformation extends Transformation<ReplaceLodashMapWithJavascriptArrayMapCandidate> {
  async apply(
    match: ReplaceLodashMapWithJavascriptArrayMapCandidate,
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
    match: ReplaceLodashMapWithJavascriptArrayMapCandidate
  ): Safety {
    return Safety.unknown();
  }

  getActionZones(
    match: ReplaceLodashMapWithJavascriptArrayMapCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Replace with Array.map", [
      {
        range: NodeRange.node(match.node.expression),
      },
    ]);
  }
}
