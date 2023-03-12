
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Range,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { RemoveIifeCandidate } from "./RemoveIifeCandidate";

export class RemoveIifeTransformation extends Transformation<RemoveIifeCandidate> {
  async apply(match: RemoveIifeCandidate, tree: TransformedNodeTree) {
    // replace expression statement with block if result is a block
    // (to remove semicolon), otherwise retain expression statement:
    const nodeToReplace = ts.isBlock(match.captures.body)
      ? ts.isVoidExpression(match.node.parent)
        ? match.node.parent.parent // remove void expression for block body
        : match.node.parent // block body -> replace expression statement
      : match.node; // expression body

    tree.replace(nodeToReplace, match.captures.body);
  }

  analyzeSafety(match: RemoveIifeCandidate): Safety {
    const messages = new SafetyMessageList();

    const surroundingScope = match.context.getScope(
      match.captures.function
    ).parent;
    const { hoistedBindings } = match.data;
    const conflictingBindings = hoistedBindings.filter((binding) =>
      surroundingScope?.hasBinding(binding.name)
    );

    if (conflictingBindings.length > 0) {
      // TODO message for all conflicting bindings
      const firstConflictName = conflictingBindings[0].name;
      messages.error(
        `'${firstConflictName}' is already declared in surrounding scope`
      );
    } else if (hoistedBindings.length > 0) {
      // conflicting bindings implies hoisted bindings, therefore handled in else-if
      messages.warning("contains hoisted declarations");
    }

    return messages.produceSafe();
  }

  getSuggestion(match: RemoveIifeCandidate, safety: Safety): Suggestion | null {
    if (!safety.isSafe()) {
      return null;
    }

    return {
      description: `You can remove the ${match.data.type}.`,
      shortActionLabel: "Remove",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: RemoveIifeCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(`Remove ${match.data.type}`, [
      {
        range: new Range(match.node.pos, match.captures.body.pos),
        level: CodeAssistLevel.QuickFix,
      },
      {
        range: new Range(match.node.expression.end, match.node.end),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
