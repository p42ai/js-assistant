
import {
  Binding,
  BindingElement,
  Context,
  factory,
  getDeclarationRoot,
  Match,
  This,
  TransformedNodeTree,
} from "@p42/engine";
import _ from "lodash";
import ts from "typescript";

type InlineVariableNode = ts.VariableDeclaration | ts.BindingElement;
type InlineVariableCaptures = {
  binding: Binding;
  variableStatement: ts.VariableStatement;
};
type InlineVariableData = {
  readReferenceCount: number;
};

export class InlineVariableMatch
  implements
    Match<InlineVariableNode, InlineVariableCaptures, InlineVariableData>
{
  constructor(
    readonly node: InlineVariableNode,
    readonly captures: InlineVariableCaptures,
    readonly data: InlineVariableData,
    readonly context: Context
  ) {}

  get hasType(): boolean {
    // TODO type support when destructuring?
    return ts.isVariableDeclaration(this.node) && this.node.type != null;
  }

  get declaringIdentifier(): ts.Identifier {
    return this.captures.binding.declaringNodes[0] as ts.Identifier;
  }

  get isInlineFromDestructuring(): boolean {
    return ts.isBindingElement(this.node);
  }

  get variableDeclaration(): ts.VariableDeclaration {
    return ts.isVariableDeclaration(this.node)
      ? this.node
      : (getDeclarationRoot(this.node) as ts.VariableDeclaration);
  }

  get initializer(): ts.Expression {
    return this.variableDeclaration.initializer!;
  }

  get isImmediatelyReturned(): boolean {
    const {
      binding: { readReferences },
      variableStatement: declarationStatement,
      variableStatement: {
        declarationList: { declarations },
      },
    } = this.captures;

    // declaration is last declaration in statement:
    if (
      declarations.indexOf(this.variableDeclaration) !==
      declarations.length - 1
    ) {
      return false;
    }

    // 0 read references leads to crash
    // 2+ read references means there is no immediate return
    if (readReferences.length !== 1) {
      return false;
    }

    const readParent = readReferences[0].identifier.parent;

    if (!ts.isReturnStatement(readParent)) {
      return false;
    }

    const returnBlock = readParent.parent;

    if (
      !ts.isBlock(returnBlock) ||
      returnBlock !== declarationStatement.parent
    ) {
      return false;
    }

    const returnIndex = returnBlock.statements.indexOf(readParent);
    const declarationIndex =
      returnBlock.statements.indexOf(declarationStatement);

    return returnIndex === declarationIndex + 1;
  }

  createInlineExpression(tree: TransformedNodeTree): ts.Expression {
    return ts.isVariableDeclaration(this.node)
      ? tree.copy(this.initializer)
      : factory.createFlattenedExpressionFromDestructuring({
          bindingElement: this.node,
          baseExpression: this.initializer,
          tree,
        });
  }

  get isSafelyInlineableThisReference(): boolean {
    return (
      This.isThisExpression(this.initializer) &&
      this.hasSingleThisScope &&
      !this.isInlineFromDestructuring
    );
  }

  /**
   * @returns true when all occurrences of this variable have the same
   *          'this' scope as the original declaration.
   */
  get hasSingleThisScope(): boolean {
    const originalThisScopeNode = This.getThisScopeNode(this.node);
    return this.captures.binding.readReferences.every(
      (reference) =>
        This.getThisScopeNode(reference.identifier) === originalThisScopeNode
    );
  }
}
