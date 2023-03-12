
import {
  ActionZone,
  BindingElement,
  createActionZones,
  getSyntaxKindLabel,
  Node,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
  VariableDeclarationKind,
  VariableDeclarationList,
} from "@p42/engine";
import ts from "typescript";
import { PushIntoInitialValueDeclarationMatch } from "./PushIntoInitialValueDeclarationMatch";

export class PushIntoInitialValueDeclarationTransformation extends Transformation<PushIntoInitialValueDeclarationMatch> {
  async apply(
    match: PushIntoInitialValueDeclarationMatch,
    tree: TransformedNodeTree
  ) {
    const { node, targetParent, targetDeclarationList } = match;

    tree.remove(node);

    if (targetDeclarationList !== undefined) {
      tree.replace(
        targetDeclarationList,
        tree.updateVariableDeclarationList(targetDeclarationList, {
          flags: match.updatedTargetVariableKind!.set(
            targetDeclarationList.flags
          ),
        })
      );
    }

    if (ts.isBindingElement(targetParent)) {
      tree.replace(
        targetParent,
        tree.updateBindingElement(
          targetParent,
          BindingElement.isShorthand(targetParent)
            ? {
                propertyName: targetParent.name as ts.Identifier,
                name: node.name,
              }
            : {
                name: node.name,
              }
        )
      );
      return;
    }

    if (ts.isVariableDeclaration(targetParent)) {
      tree.replace(
        targetParent,
        tree.updateVariableDeclaration(targetParent, {
          name: node.name,
          type: node.type,
        })
      );
      return;
    }

    if (ts.isParameter(targetParent)) {
      tree.replace(
        targetParent,
        tree.updateParameterDeclaration(targetParent, {
          name: node.name,
          type: node.type,
        })
      );
      return;
    }

    throw new Error(
      `unsupported target type: ${getSyntaxKindLabel(targetParent.kind)}`
    );
  }

  analyzeSafety(match: PushIntoInitialValueDeclarationMatch): Safety {
    const { node, targetParent, targetDeclarationList } = match;

    const messages = new SafetyMessageList();

    if (Node.isExported(match.node)) {
      messages.warning("removes export");
    } else if (Node.isExported(match.captures.target)) {
      messages.warning("changes export");
    }

    if (ts.isBindingElement(targetParent) && node.type != null) {
      messages.information("removes type");
    }

    if (
      targetDeclarationList != null &&
      (!VariableDeclarationList.hasExactlyOneDeclaration(
        targetDeclarationList
      ) ||
        ts.isBindingElement(targetParent))
    ) {
      const newVariableKind = match.updatedTargetVariableKind!;
      const message = `changes declaration to ${newVariableKind.label}`;
      switch (newVariableKind) {
        case VariableDeclarationKind.Let:
          messages.information(message);
          break;
        case VariableDeclarationKind.Var:
          messages.warning(message);
          break;
      }
    }

    return messages.produceUnknown();
  }

  getActionZones(
    match: PushIntoInitialValueDeclarationMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      "Push into initial value declaration",
      [
        {
          range: NodeRange.node(match.node),
        },
      ]
    );
  }
}
