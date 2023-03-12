
import {
  ActionZone,
  createActionZones,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ReplaceLodashSomeWithJavascriptArraySomeCandidate } from "./ReplaceLodashSomeWithJavascriptArraySomeCandidate";

export class ReplaceLodashSomeWithJavascriptArraySomeTransformation extends Transformation<ReplaceLodashSomeWithJavascriptArraySomeCandidate> {
  async apply(
    match: ReplaceLodashSomeWithJavascriptArraySomeCandidate,
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
    match: ReplaceLodashSomeWithJavascriptArraySomeCandidate
  ): Safety {
    return Safety.unknown();
  }

  getActionZones(
    match: ReplaceLodashSomeWithJavascriptArraySomeCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Replace with Array.some", [
      {
        range: NodeRange.node(match.node.expression),
      },
    ]);
  }
}
