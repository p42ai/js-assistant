import ts from "typescript";
import { Binding } from "../augmentation/scope/Binding";
import { Context } from "../matcher/engine/Context";
import { hasAncestor } from "../matcher/hasAncestor";
import { getDeclaredBindings } from "./getDeclaredBindings";
import { getFirstAncestorOrSelfOfKind } from "./getFirstAncestor";

export type StatementContainer = ts.Block | ts.SourceFile;

export const STATEMENT_SYNTAX_KINDS = [
  ts.SyntaxKind.EmptyStatement,
  ts.SyntaxKind.VariableStatement,
  ts.SyntaxKind.ExpressionStatement,
  ts.SyntaxKind.IfStatement,
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.WhileStatement,
  ts.SyntaxKind.ForStatement,
  ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.ForOfStatement,
  ts.SyntaxKind.ContinueStatement,
  ts.SyntaxKind.BreakStatement,
  ts.SyntaxKind.ReturnStatement,
  ts.SyntaxKind.WithStatement,
  ts.SyntaxKind.SwitchStatement,
  ts.SyntaxKind.LabeledStatement,
  ts.SyntaxKind.ThrowStatement,
  ts.SyntaxKind.TryStatement,
  ts.SyntaxKind.DebuggerStatement,
  ts.SyntaxKind.Block,
];

export function isStatement(node: ts.Node): node is ts.Statement {
  return STATEMENT_SYNTAX_KINDS.includes(node.kind);
}

export function getStatementAncestor(node: ts.Node): ts.Statement {
  return getFirstAncestorOrSelfOfKind(
    node,
    STATEMENT_SYNTAX_KINDS
  ) as ts.Statement;
}

/**
 * @returns the statement in the sourcefile
 */
export function getRootStatementAncestor(node: ts.Node): ts.Statement {
  let current: ts.Node = node;
  while (current != null && !ts.isSourceFile(current.parent)) {
    current = current.parent;
  }
  return current as ts.Statement;
}

/**
 * Returns the position of the statement in the list of statements of its parent.
 */
export function getStatementIndex(statement: ts.Statement): number {
  return (statement.parent as ts.BlockLike).statements.indexOf(statement);
}

export function getSourceFileStatementIndex(node: ts.Node): {
  sourceFile: ts.SourceFile;
  index: number;
} {
  const rootStatementAncestor = getRootStatementAncestor(node);
  return {
    sourceFile: rootStatementAncestor.parent as ts.SourceFile,
    index: getStatementIndex(rootStatementAncestor),
  };
}

export function getDeclaredBindingsThatAreUsedOutside(
  statements: Array<ts.Statement>,
  context: Context
): Array<Binding> {
  const bindings = getDeclaredBindings.forStatements(statements, context);

  const bindingsUsedOutside: Array<Binding> = [];
  for (const binding of bindings) {
    for (const reference of binding.references) {
      // if a binding reference has no parent from the list of selected statements,
      // it means that it is used outside of them
      const isBindingUsedOutsideOfStatements = !hasAncestor((ancestor) =>
        statements.includes(ancestor as any)
      )(reference.identifier, context);

      if (isBindingUsedOutsideOfStatements) {
        bindingsUsedOutside.push(binding);
        break;
      }
    }
  }

  return bindingsUsedOutside;
}
