
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  NodeRange,
  Range,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertToDestructuringAssignmentCandidate } from "./ConvertToDestructuringAssignmentCandidate";

export class ConvertToDestructuringAssignmentTransformation extends Transformation<ConvertToDestructuringAssignmentCandidate> {
  async apply(
    match: ConvertToDestructuringAssignmentCandidate,
    tree: TransformedNodeTree
  ) {
    const { type } = match.node;
    const { variableName, propertyName } = match.captures;

    const bindingElement = tree.createBindingElement(
      match.data.canBeShorthandExpression
        ? {
            name: variableName,
          }
        : {
            name: variableName,
            propertyName,
          }
    );

    const updatedVariableDeclaration = tree.updateVariableDeclaration(
      match.node,
      {
        name: tree.createObjectBindingPattern({
          elements: [bindingElement],
        }),
        type:
          type != null
            ? tree.createTypeLiteralNode({
                members: [
                  tree.createPropertySignature({
                    name: tree.createIdentifier({
                      text: propertyName.text,
                    }),
                    type,
                  }),
                ],
              })
            : undefined,
        initializer: (match.node.initializer as ts.PropertyAccessExpression)
          .expression,
      }
    );
    tree.replace(match.node, updatedVariableDeclaration);

    return EditorOperation.compose(
      EditorOperation.highlightNodes(tree, updatedVariableDeclaration)
    );
  }

  analyzeSafety(match: ConvertToDestructuringAssignmentCandidate): Safety {
    return match.node.type != null
      ? Safety.warning("type information could need refinement")
      : Safety.safe();
  }

  getSuggestion(
    match: ConvertToDestructuringAssignmentCandidate,
    safety: Safety
  ): Suggestion | null {
    if (!match.data.canBeShorthandExpression || !safety.isSafe()) {
      return null;
    }

    const { propertyName } = match.captures;

    return {
      description: "You can use a destructuring assignment.",
      highlightRanges: [
        NodeRange.node(match.node.name),
        new Range(propertyName.pos - 1, propertyName.end),
      ],
    };
  }

  getActionZones(
    match: ConvertToDestructuringAssignmentCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to destructuring", [
      {
        range: NodeRange.node(match.node),
        level: isSuggestion
          ? CodeAssistLevel.Suggestion
          : CodeAssistLevel.Regular,
      },
    ]);
  }
}
