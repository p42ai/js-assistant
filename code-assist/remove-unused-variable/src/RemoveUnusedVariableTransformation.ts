
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  isSideEffectFree,
  NodeRange,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
  VariableDeclarationList,
} from "@p42/engine";
import { RemoveUnusedVariableMatch } from "./RemoveUnusedVariableMatch";

export class RemoveUnusedVariableTransformation extends Transformation<RemoveUnusedVariableMatch> {
  async apply(match: RemoveUnusedVariableMatch, tree: TransformedNodeTree) {
    tree.remove(match.node);
  }

  analyzeSafety(match: RemoveUnusedVariableMatch) {
    const messages = new SafetyMessageList();

    if (match.wouldRemovePotentialDestructuringSideEffect) {
      messages.warning("removes destructuring with potential side-effects");
    }

    const { initializer } = match.captures.variableDeclaration;
    if (initializer != null) {
      if (
        match.wouldRemoveVariableDeclaration &&
        !isSideEffectFree(initializer, match.context)
      ) {
        messages.warning("removes initializer with potential side-effects");
      }

      if (
        VariableDeclarationList.isGlobalVarDeclarationList(
          match.variableDeclarationList,
          match.context
        )
      ) {
        messages.warning("could remove global variable");
      }
    }

    return messages.produceSafe();
  }

  getSuggestion(
    match: RemoveUnusedVariableMatch,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can remove the unused variable '${match.captures.variableName}'.`,
      shortActionLabel: "Remove",
      highlightRanges: [NodeRange.node(match.node.name)],
    };
  }

  getActionZones(
    match: RemoveUnusedVariableMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Remove unused variable", [
      {
        range: NodeRange.node(match.node.name),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
