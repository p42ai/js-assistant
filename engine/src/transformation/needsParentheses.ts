import ts from "typescript";
import * as BinaryExpression from "../ast/BinaryExpression";
import { BinaryOperator } from "../ast/BinaryOperator";
import { NodeInformation } from "./AbstractTransformedNodeTree";

const injectionPatterns = [
  {
    nodeKind: ts.SyntaxKind.ArrowFunction,
    parentKind: ts.SyntaxKind.CallExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.ArrowFunction,
    parentKind: ts.SyntaxKind.PropertyAccessExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.ArrowFunction,
    parentKind: ts.SyntaxKind.BinaryExpression,
    properties: ["left", "right"],
    check: (information: NodeInformation) =>
      !(
        BinaryOperator.isAssignment(
          (information.parent as ts.BinaryExpression).operatorToken.kind
        ) && information.parentProperty === "right"
      ),
  },
  {
    nodeKind: ts.SyntaxKind.BinaryExpression,
    parentKind: ts.SyntaxKind.AsExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.BinaryExpression,
    parentKind: ts.SyntaxKind.AwaitExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.BinaryExpression,
    parentKind: ts.SyntaxKind.BinaryExpression,
    properties: ["left", "right"],
    check: (information: NodeInformation) => {
      const operator = BinaryExpression.getOperator(
        information.node as ts.BinaryExpression
      );
      const { precedence } = operator;
      const parentPrecedence = BinaryExpression.getPrecedence(
        information.parent as ts.BinaryExpression
      );

      if (parentPrecedence > precedence) {
        return true;
      }

      if (parentPrecedence < precedence) {
        return false;
      }

      // operators with the same precedence have the same associativity,
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
      const { associativity } = operator;

      switch (associativity) {
        case "left-to-right":
          return information.parentProperty === "right";
        case "right-to-left":
          return information.parentProperty === "left";
      }
    },
  },
  {
    nodeKind: ts.SyntaxKind.BinaryExpression,
    parentKind: ts.SyntaxKind.ElementAccessExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.BinaryExpression,
    parentKind: ts.SyntaxKind.PostfixUnaryExpression,
    properties: ["operand"],
  },
  {
    nodeKind: ts.SyntaxKind.BinaryExpression,
    parentKind: ts.SyntaxKind.PrefixUnaryExpression,
    properties: ["operand"],
  },
  {
    nodeKind: ts.SyntaxKind.BinaryExpression,
    parentKind: ts.SyntaxKind.PropertyAccessExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.BinaryExpression,
    parentKind: ts.SyntaxKind.TypeOfExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.BinaryExpression,
    parentKind: ts.SyntaxKind.VoidExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.ConditionalExpression,
    parentKind: ts.SyntaxKind.AsExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.ConditionalExpression,
    parentKind: ts.SyntaxKind.AwaitExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.ConditionalExpression,
    parentKind: ts.SyntaxKind.BinaryExpression,
    properties: ["left", "right"],
    check: (information: NodeInformation) =>
      BinaryOperator.isPrecedenceGreaterThanAssignment(
        (information.parent as ts.BinaryExpression).operatorToken.kind
      ),
  },
  {
    nodeKind: ts.SyntaxKind.ConditionalExpression,
    parentKind: ts.SyntaxKind.PostfixUnaryExpression,
    properties: ["operand"],
  },
  {
    nodeKind: ts.SyntaxKind.ConditionalExpression,
    parentKind: ts.SyntaxKind.PrefixUnaryExpression,
    properties: ["operand"],
  },
  {
    nodeKind: ts.SyntaxKind.ConditionalExpression,
    parentKind: ts.SyntaxKind.TypeOfExpression,
    properties: ["expression"],
  },
  {
    nodeKind: ts.SyntaxKind.ConditionalExpression,
    parentKind: ts.SyntaxKind.VoidExpression,
    properties: ["expression"],
  },
];

export function needsParentheses(information: NodeInformation): boolean {
  for (const injectionPattern of injectionPatterns) {
    if (
      injectionPattern.nodeKind === information.node.kind &&
      injectionPattern.parentKind === information.parent?.kind &&
      injectionPattern.properties.includes(information.parentProperty!)
    ) {
      return injectionPattern.check?.(information) ?? true;
    }
  }
  return false;
}
