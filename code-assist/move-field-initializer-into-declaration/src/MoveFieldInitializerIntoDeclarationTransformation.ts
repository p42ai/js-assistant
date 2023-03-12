
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  getBindings,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { MoveFieldInitializerIntoDeclarationMatch } from "./MoveFieldInitializerIntoDeclarationMatch";

export class MoveFieldInitializerIntoDeclarationTransformation extends Transformation<MoveFieldInitializerIntoDeclarationMatch> {
  async apply(
    match: MoveFieldInitializerIntoDeclarationMatch,
    tree: TransformedNodeTree
  ) {
    tree.remove(match.node);
    tree.replace(
      match.captures.propertyDeclaration,
      tree.updatePropertyDeclaration(match.captures.propertyDeclaration, {
        initializer: match.captures.initializationExpression,
      })
    );
  }

  analyzeSafety(match: MoveFieldInitializerIntoDeclarationMatch): Safety {
    const messages = new SafetyMessageList();

    if (match.captures.propertyDeclaration.initializer != null) {
      messages.warning("overwrites existing initial value");
    }

    const fieldScope = match.context.getScope(
      match.captures.propertyDeclaration
    );
    const unavailableBindings = Array.from(
      getBindings(match.node, match.context)
    )
      // remove all global bindings:
      .filter((binding) => !binding.isGlobal)
      // remove all bindings that are available at the field declaration:
      .filter((binding) => !binding.isAvailableInScope(fieldScope));

    if (unavailableBindings.length > 0) {
      messages.error("parameters not available at field declaration");
    }

    return messages.produceUnknown();
  }

  getActionZones(
    match: MoveFieldInitializerIntoDeclarationMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Move initialization into field declaration", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
