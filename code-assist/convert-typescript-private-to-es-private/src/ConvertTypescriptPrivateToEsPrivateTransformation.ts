
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertTypescriptPrivateToEsPrivateMatch } from "./ConvertTypescriptPrivateToEsPrivateMatch";

export class ConvertTypescriptPrivateToEsPrivateTransformation extends Transformation<ConvertTypescriptPrivateToEsPrivateMatch> {
  async apply(
    match: ConvertTypescriptPrivateToEsPrivateMatch,
    tree: TransformedNodeTree
  ) {
    function createPrivateIdentifier() {
      return tree.createPrivateIdentifier({ text: match.targetName });
    }

    const filteredModifiers = match.node.modifiers?.filter(
      (modifier) => modifier.kind !== ts.SyntaxKind.PrivateKeyword
    );

    const modifiers =
      (filteredModifiers?.length === 0 ? null : filteredModifiers) ?? null;

    const node = match.node;
    tree.replace(
      node,
      ts.isPropertyDeclaration(node)
        ? tree.updatePropertyDeclaration(node, {
            modifiers,
            name: createPrivateIdentifier(),
          })
        : tree.updateMethodDeclaration(node, {
            modifiers,
            name: createPrivateIdentifier(),
          })
    );

    for (const reference of match.getReferences()) {
      tree.replace(reference.name, createPrivateIdentifier());
    }
  }

  analyzeSafety(match: ConvertTypescriptPrivateToEsPrivateMatch): Safety {
    const messages = new SafetyMessageList();
    messages.warning("indirect access with overridden 'this' can break");
    return messages.produceUnknown();
  }

  getSuggestion(
    match: ConvertTypescriptPrivateToEsPrivateMatch,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can convert the private ${
        ts.isPropertyDeclaration(match.node) ? "property" : "method"
      } '${match.captures.identifier.getText()}' to #-private.`,
      highlightRanges: [match.range],
    };
  }

  getImpactedNodes(match: ConvertTypescriptPrivateToEsPrivateMatch): ts.Node[] {
    return [match.node, ...match.getReferences()];
  }

  getActionZones(
    match: ConvertTypescriptPrivateToEsPrivateMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to #-private", [
      {
        range: match.range,
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
