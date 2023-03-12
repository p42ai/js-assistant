import ts from "typescript";
import { Range } from "../util/text/Range";
import { getElseKeyword } from "./IfStatement";

function getStartLineRange(node: ts.Node, characterCount: number): Range {
  const start = node.getStart();
  return new Range(start, start + characterCount);
}

export const fullNode = (node: ts.Node): Range =>
  new Range(node.getFullStart(), node.getEnd());

export const node = (node: ts.Node): Range =>
  new Range(node.getStart(), node.getEnd());

export const firstCharactersOfNode = (
  node: ts.Node,
  numberOfCharacters = 1
): Range =>
  new Range(
    node.getStart(),
    Math.min(node.getStart() + numberOfCharacters, node.getEnd())
  );

export const lastCharactersOfNode = (
  node: ts.Node,
  numberOfCharacters = 1
): Range =>
  new Range(
    Math.max(node.getEnd() - numberOfCharacters, node.getStart()),
    node.getEnd()
  );

export const assignment = (assignmentExpression: ts.BinaryExpression): Range =>
  new Range(
    node(assignmentExpression.left).start,
    node(assignmentExpression.operatorToken).end
  );

export const binaryExpressionOperator = (
  binaryExpression: ts.BinaryExpression
): Range => node(binaryExpression.operatorToken);

export const identifier = (identifier: ts.Identifier): Range =>
  node(identifier);

export const ifStatementIfKeyword = (ifStatement: ts.IfStatement): Range =>
  getStartLineRange(ifStatement, "if".length);

export const ifStatementHead = (ifStatement: ts.IfStatement): Range =>
  new Range(ifStatement.getStart(), ifStatement.expression.end + 1);

export const ifStatementElseKeyword = (ifStatement: ts.IfStatement): Range =>
  node(getElseKeyword(ifStatement)!);

export const prefixUnaryExpression = (
  prefixUnaryExpression: ts.PrefixUnaryExpression
): Range => getStartLineRange(prefixUnaryExpression, "!".length);

export const forStatement = (
  forStatement: ts.ForStatement | ts.ForInOrOfStatement
): Range => getStartLineRange(forStatement, "for".length);

export const loopHead = (
  loop: ts.ForStatement | ts.ForInOrOfStatement
): Range => new Range(loop.getStart(), loop.statement.pos);

export const loopHeadContent = (loop: ts.ForOfStatement): Range =>
  new Range(loop.initializer.getStart(), loop.expression.getEnd());

export const returnStatement = (returnStatement: ts.ReturnStatement): Range =>
  getStartLineRange(returnStatement, "return".length);

export const childToken = (
  parent: ts.Node,
  tokenKind: ts.SyntaxKind
): Range => {
  const token = parent.getChildren().find((token) => token.kind === tokenKind);
  return token != null
    ? node(token)
    : // fallback: full node range:
      node(parent);
};

export const colonToken = (
  element: ts.BindingElement | ts.PropertyAssignment
): Range => childToken(element, ts.SyntaxKind.ColonToken);

export const equalsToken = (element: ts.VariableDeclaration): Range =>
  childToken(element, ts.SyntaxKind.EqualsToken);

export const functionLabel = (
  functionLikeNode: ts.FunctionExpression | ts.FunctionDeclaration
): Range => childToken(functionLikeNode, ts.SyntaxKind.FunctionKeyword);

export const switchHead = (switchStatement: ts.SwitchStatement): Range =>
  new Range(switchStatement.getStart(), switchStatement.caseBlock.getStart());

export const variableDeclarationList = (
  variableDeclarationList: ts.VariableDeclarationList
): Range =>
  // flexible length for const, var, let
  getStartLineRange(
    variableDeclarationList,
    variableDeclarationList.getFirstToken()!.getText().length
  );
