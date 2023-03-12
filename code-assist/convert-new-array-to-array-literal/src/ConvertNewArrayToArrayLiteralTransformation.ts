
import {
  ActionZone,
  createActionZones,
  matchers as m,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertNewArrayToArrayLiteralMatch } from "./ConvertNewArrayToArrayLiteralMatch";

const { type } = m;

export class ConvertNewArrayToArrayLiteralTransformation extends Transformation<ConvertNewArrayToArrayLiteralMatch> {
  async apply(
    match: ConvertNewArrayToArrayLiteralMatch,
    tree: TransformedNodeTree
  ) {
    const arrayLiteralExpression = tree.createArrayLiteralExpression({
      elements: match.node.arguments?.slice() ?? [],
    });
    const { parent } = match.node;

    // special case: move type information into variable/property declaration
    if (
      match.captures.type != null &&
      (ts.isVariableDeclaration(parent) ||
        ts.isPropertyDeclaration(parent) ||
        ts.isParameter(parent)) &&
      parent.initializer === match.node &&
      parent.type == null
    ) {
      const updatedContent = {
        type: tree.createArrayTypeNode({
          elementType: match.captures.type,
        }),
        initializer: arrayLiteralExpression,
      };

      tree.replace(
        parent,
        ts.isVariableDeclaration(parent)
          ? tree.updateVariableDeclaration(parent, updatedContent)
          : ts.isPropertyDeclaration(parent)
          ? tree.updatePropertyDeclaration(parent, updatedContent)
          : tree.updateParameterDeclaration(parent, updatedContent)
      );

      return;
    }

    tree.replace(match.node, arrayLiteralExpression);
  }

  analyzeSafety(match: ConvertNewArrayToArrayLiteralMatch): Safety {
    const messages = new SafetyMessageList();

    // evaluate if single argument call can be special array size invocation:
    const newArguments = match.node.arguments;
    if (newArguments?.length === 1) {
      if (type.numeric(newArguments[0], match.context)) {
        messages.error("single number parameter specifies array size");
      } else {
        messages.warning(
          "could be single number parameter that specifies array size"
        );
      }
    }

    // evaluate generic type information removal and impact:
    const { parent } = match.node;
    if (match.captures.type != null) {
      if (
        (ts.isVariableDeclaration(parent) ||
          ts.isPropertyDeclaration(parent) ||
          ts.isParameter(parent)) &&
        parent.initializer === match.node
      ) {
        if (parent.type != null) {
          messages.information("removes generic type");
        }
      } else {
        messages.warning("removes generic type");
      }
    }

    return messages.produceSafe();
  }

  getActionZones(
    match: ConvertNewArrayToArrayLiteralMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      "Convert to […]",
      [
        {
          range: NodeRange.node(match.node),
        },
      ]
    );
  }
}
