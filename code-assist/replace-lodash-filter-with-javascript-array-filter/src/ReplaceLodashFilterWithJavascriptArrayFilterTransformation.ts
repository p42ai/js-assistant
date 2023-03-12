
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ReplaceLodashFilterWithJavascriptArrayFilterCandidate } from "./ReplaceLodashFilterWithJavascriptArrayFilterCandidate";

export class ReplaceLodashFilterWithJavascriptArrayFilterTransformation extends Transformation<ReplaceLodashFilterWithJavascriptArrayFilterCandidate> {
  async apply(
    match: ReplaceLodashFilterWithJavascriptArrayFilterCandidate,
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
    match: ReplaceLodashFilterWithJavascriptArrayFilterCandidate
  ): Safety {
    return Safety.unknown();
  }

  getActionZones(
    match: ReplaceLodashFilterWithJavascriptArrayFilterCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Replace with Array.filter", [
      {
        range: NodeRange.node(match.node.expression),
        level: CodeAssistLevel.QuickFix,
      },
    ]);
  }
}
