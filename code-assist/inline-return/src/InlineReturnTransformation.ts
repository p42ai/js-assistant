
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  isBlockLike,
  NodeRange,
  Safety,
  Statement,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { InlineReturnCandidate } from "./InlineReturnCandidate";

export class InlineReturnTransformation extends Transformation<InlineReturnCandidate> {
  async apply(match: InlineReturnCandidate, tree: TransformedNodeTree) {
    if (match.data.canRemoveVariableDeclaration) {
      const binding = match.captures.variableBinding;
      const declaringIdentifier = binding.declaringNodes[0];
      tree.remove(declaringIdentifier);

      // if the return statement is retained, replace the identifier
      // with its initial value (or remove it).
      if (match.captures.removableReturnStatement == null) {
        for (const reference of binding.references) {
          const referenceParent = reference.identifier.parent;

          if (ts.isReturnStatement(referenceParent)) {
            const declaration = binding.declaringNodes[0]
              .parent as ts.VariableDeclaration;

            // TODO tree.remove(reference.identifier) should work here
            tree.replace(
              referenceParent,
              tree.updateReturnStatement(referenceParent, {
                expression: declaration.initializer ?? null,
              })
            );
          }
        }
      }
    }

    if (match.captures.removableReturnStatement != null) {
      tree.remove(match.captures.removableReturnStatement);
    }

    // remove break statements
    // TODO what if there are layers of blocks?
    const { parent } = match.node;
    if (isBlockLike(parent)) {
      const nextStatement: ts.Statement | undefined =
        parent.statements[Statement.getStatementIndex(match.node) + 1];

      if (nextStatement != null && ts.isBreakStatement(nextStatement)) {
        tree.remove(nextStatement);
      }
    }

    tree.replace(
      match.node,
      tree.createReturnStatement({
        expression: match.captures.assignedExpression,
      })
    );
  }

  analyzeSafety(match: InlineReturnCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: InlineReturnCandidate,
    safety: Safety
  ): Suggestion | null {
    const { variableName } = match.captures;
    return {
      description: `You can replace the '${variableName}' assignment with a return statement${
        match.data.canRemoveVariableDeclaration
          ? ` and remove '${variableName}'`
          : ""
      }.`,
      shortActionLabel: "Replace",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: InlineReturnCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    const assignmentExpression = match.node.expression as ts.BinaryExpression;
    return createActionZones(
      `Replace with return statement${
        match.data.canRemoveVariableDeclaration
          ? ` and remove '${match.captures.variableName}'`
          : ""
      }`,
      [
        {
          range: NodeRange.assignment(assignmentExpression),
          level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
        },
      ]
    );
  }
}
