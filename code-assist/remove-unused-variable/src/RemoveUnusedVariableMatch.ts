
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type RemoveUnusedVariableNode = ts.VariableDeclaration | ts.BindingElement;
type RemoveUnusedVariableCaptures = {
  variableDeclaration: ts.VariableDeclaration;
  variableName: string;
};
type RemoveUnusedVariableData = undefined;

export class RemoveUnusedVariableMatch
  implements
    Match<
      RemoveUnusedVariableNode,
      RemoveUnusedVariableCaptures,
      RemoveUnusedVariableData
    >
{
  constructor(
    readonly node: RemoveUnusedVariableNode,
    readonly captures: RemoveUnusedVariableCaptures,
    readonly data: RemoveUnusedVariableData,
    readonly context: Context
  ) {}

  get variableDeclarationList(): ts.VariableDeclarationList {
    return this.captures.variableDeclaration
      .parent as ts.VariableDeclarationList;
  }

  get isDestructuredVariable(): boolean {
    return ts.isBindingElement(this.node);
  }

  get wouldRemoveVariableDeclaration(): boolean {
    if (!this.isDestructuredVariable) {
      return true;
    }

    const rootPattern = this.captures.variableDeclaration
      .name as ts.BindingPattern;

    return rootPattern.elements.length === 1;
  }

  get wouldRemovePotentialDestructuringSideEffect(): boolean {
    let currentNode: ts.Node = this.node;

    while (ts.isBindingElement(currentNode)) {
      const { parent } = currentNode;

      if (
        // getter call for object destructuring can have side-effect:
        ts.isObjectBindingPattern(parent) ||
        // array destructuring can have side-effect:
        (parent.elements.length === 1 && parent.elements[0] === currentNode)
      ) {
        return true;
      }

      currentNode = parent.parent;
    }

    return false;
  }
}
