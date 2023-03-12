import ts from "typescript";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";

export const createIndexedForLoop = ({
  indexVariableName,
  arrayExpression,
  statement,
  tree,
}: {
  indexVariableName: string;
  arrayExpression: ts.Expression;
  statement: ts.Statement;
  tree: TransformedNodeTree;
}) =>
  tree.createForStatement({
    initializer: tree.createVariableDeclarationList({
      declarations: [
        tree.createVariableDeclaration({
          name: tree.createIdentifier({
            text: indexVariableName,
          }),
          initializer: tree.createNumericLiteral({
            text: "0",
          }),
        }),
      ],
      flags: ts.NodeFlags.Let,
    }),
    condition: tree.createBinaryExpression({
      left: tree.createIdentifier({
        text: indexVariableName,
      }),
      operator: ts.SyntaxKind.LessThanToken,
      right: tree.createPropertyAccessExpression({
        expression: arrayExpression,
        name: "length",
      }),
    }),
    incrementor: tree.createPostfixUnaryExpression({
      operand: tree.createIdentifier({
        text: indexVariableName,
      }),
      operator: ts.SyntaxKind.PlusPlusToken,
    }),
    statement,
  });
