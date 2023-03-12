
import {
  Safety,
  SafetyMessageList,
  Transformation,
  matchers as m,
  TransformedNodeTree,
  Suggestion,
  NodeRange,
  ActionZone,
  createActionZones,
  CodeAssistLevel,
} from "@p42/engine";
import ts from "typescript";
import { RemoveTrailingArrayDestructuringHolesMatch } from "./RemoveTrailingArrayDestructuringHolesMatch";

const { type } = m;

export class RemoveTrailingArrayDestructuringHolesTransformation extends Transformation<RemoveTrailingArrayDestructuringHolesMatch> {
  async apply(
    match: RemoveTrailingArrayDestructuringHolesMatch,
    tree: TransformedNodeTree
  ) {
    if (match.hasOnlyHoles) {
      tree.remove(match.node);
      return;
    }

    const { elements } = match.node;

    tree.replace(
      match.node,
      tree.updateArrayBindingPattern(match.node, {
        elements: elements.slice(
          0,
          elements.length - match.data.trailingOmittedExpressionCount
        ),
      })
    );
  }

  analyzeSafety(match: RemoveTrailingArrayDestructuringHolesMatch): Safety {
    const messages = new SafetyMessageList();

    // TODO test nestng
    if (
      !(
        ts.isVariableDeclaration(match.node.parent) &&
        match.node.parent.initializer != null &&
        type.array(match.node.parent.initializer, match.context)
      )
    ) {
      messages.warning("destructuring could have side-effect");
    }

    return messages.produceSafe();
  }

  getSuggestion(
    match: RemoveTrailingArrayDestructuringHolesMatch,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can remove the ${
        match.hasOnlyHoles ? "empty" : "trailing holes in the"
      } array destructuring.`,
      shortActionLabel: "Remove",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: RemoveTrailingArrayDestructuringHolesMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      `Remove ${
        match.hasOnlyHoles ? "empty array destructuring" : "trailing holes"
      }`,
      [
        {
          range: NodeRange.node(match.node),
          level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
        },
      ]
    );
  }
}
