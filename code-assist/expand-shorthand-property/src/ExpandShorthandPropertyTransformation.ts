
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
import { ExpandShorthandPropertyCandidate } from "./ExpandShorthandPropertyCandidate";

export class ExpandShorthandPropertyTransformation extends Transformation<ExpandShorthandPropertyCandidate> {
  async apply(
    match: ExpandShorthandPropertyCandidate,
    tree: TransformedNodeTree
  ) {
    const propertyIdentifier = tree.createIdentifier({
      text: match.captures.identifierName,
    });

    tree.replace(
      match.node,
      ts.isShorthandPropertyAssignment(match.node)
        ? tree.createPropertyAssignment({
            name: propertyIdentifier,
            initializer: match.node.name as ts.Identifier,
          })
        : tree.updateBindingElement(match.node, {
            propertyName: propertyIdentifier,
          })
    );
  }

  analyzeSafety(match: ExpandShorthandPropertyCandidate) {
    return Safety.safe();
  }

  getActionZones(
    match: ExpandShorthandPropertyCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Expand shorthand property", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.QuickFix,
      },
    ]);
  }
}
