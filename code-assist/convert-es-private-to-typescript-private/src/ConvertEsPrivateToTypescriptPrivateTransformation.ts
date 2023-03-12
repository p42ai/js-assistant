
import {
  ActionZone,
  createActionZones,
  NodeRange,
  Range,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertEsPrivateToTypescriptPrivateMatch } from "./ConvertEsPrivateToTypescriptPrivateMatch";

export class ConvertEsPrivateToTypescriptPrivateTransformation extends Transformation<ConvertEsPrivateToTypescriptPrivateMatch> {
  async apply(
    match: ConvertEsPrivateToTypescriptPrivateMatch,
    tree: TransformedNodeTree
  ) {
    function createIdentifier() {
      return tree.createIdentifier({ text: match.targetName });
    }

    const node = match.node;

    const nodeModifiers = ts.getModifiers(node);
    const modifiers =
      nodeModifiers == null
        ? [tree.createModifier(ts.SyntaxKind.PrivateKeyword)]
        : [tree.createModifier(ts.SyntaxKind.PrivateKeyword)].concat(
            nodeModifiers.slice()
          );

    tree.replace(
      node,
      ts.isPropertyDeclaration(node)
        ? tree.updatePropertyDeclaration(node, {
            modifiers,
            name: createIdentifier(),
          })
        : tree.updateMethodDeclaration(node, {
            modifiers,
            name: createIdentifier(),
          })
    );

    for (const reference of match.getReferences()) {
      tree.replace(reference.name, createIdentifier());
    }
  }

  analyzeSafety(match: ConvertEsPrivateToTypescriptPrivateMatch): Safety {
    const messages = new SafetyMessageList();
    messages.information("will be accessible at runtime");
    return messages.produceUnknown();
  }

  getActionZones(
    match: ConvertEsPrivateToTypescriptPrivateMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to TypeScript-private", [
      {
        range: new Range(
          match.node.getStart(),
          match.captures.identifier.getEnd()
        ),
      },
    ]);
  }
}
