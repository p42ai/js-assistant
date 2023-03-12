
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
  VariableDeclarationKind,
} from "@p42/engine";
import { MergeIntoPrecedingDestructuringAssignmentCandidate } from "./MergeIntoPrecedingDestructuringAssignmentCandidate";

const SOURCE_EXPRESSION_EVALUATION_MESSAGE = `evaluates source expression only once`;

export class MergeIntoPrecedingDestructuringAssignmentTransformation extends Transformation<MergeIntoPrecedingDestructuringAssignmentCandidate> {
  async apply(
    match: MergeIntoPrecedingDestructuringAssignmentCandidate,
    tree: TransformedNodeTree
  ) {
    const {
      previousPattern,
      declaration,
      previousDeclaration,
      previousVariableDeclarationList,
    } = match.captures;
    const {
      previousDeclarationKind,
      targetDeclarationKind,
    }: {
      declarationKind: VariableDeclarationKind.VariableDeclarationKind;
      previousDeclarationKind: VariableDeclarationKind.VariableDeclarationKind;
      targetDeclarationKind: VariableDeclarationKind.VariableDeclarationKind;
    } = match.data;

    tree.replace(
      previousPattern,
      tree.updateObjectBindingPattern(previousPattern, {
        elements: previousPattern.elements.concat(
          match.captures.pattern.elements
        ),
      })
    );

    if (declaration.type != null) {
      tree.replace(
        previousDeclaration,
        tree.updateVariableDeclaration(previousDeclaration, {
          type:
            previousDeclaration.type == null
              ? declaration.type
              : tree.createIntersectionTypeNode({
                  types: [previousDeclaration.type, declaration.type],
                }),
        })
      );
    }

    if (previousDeclarationKind !== targetDeclarationKind) {
      tree.replace(
        previousVariableDeclarationList,
        tree.updateVariableDeclarationList(previousVariableDeclarationList, {
          flags: targetDeclarationKind.set(
            previousVariableDeclarationList.flags
          ),
        })
      );
    }

    tree.remove(match.node);
  }

  analyzeSafety(
    match: MergeIntoPrecedingDestructuringAssignmentCandidate
  ): Safety {
    const { source, declaration, previousDeclaration } = match.captures;
    const { previousDeclarationKind, targetDeclarationKind, declarationKind } =
      match.data;

    const messages = new SafetyMessageList();

    if (previousDeclarationKind !== declarationKind) {
      messages.warning(`changes declaration to ${targetDeclarationKind.label}`);
    }

    if (!isSideEffectFree(source, match.context)) {
      messages.warning(SOURCE_EXPRESSION_EVALUATION_MESSAGE);
    }

    if (
      (previousDeclaration.type != null && declaration.type == null) ||
      (previousDeclaration.type == null && declaration.type != null)
    ) {
      messages.warning("merged type is incomplete");
    }

    return messages.produceSafe();
  }

  getSuggestion(
    match: MergeIntoPrecedingDestructuringAssignmentCandidate,
    safety: Safety
  ): Suggestion | null {
    if (
      !safety.isSafe() &&
      !(
        safety.isWarning() &&
        safety.message === SOURCE_EXPRESSION_EVALUATION_MESSAGE
      )
    ) {
      return null;
    }

    return {
      description:
        "You can merge an object destructuring assignment into its preceding sibling.",
      shortActionLabel: "Merge",
      highlightRanges: [
        NodeRange.node(match.captures.previousDeclaration),
        NodeRange.node(match.captures.declaration),
      ],
    };
  }

  getActionZones(
    match: MergeIntoPrecedingDestructuringAssignmentCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Merge into previous destructuring assignment", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
