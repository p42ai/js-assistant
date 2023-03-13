import ts from "typescript";

export const SYNTAX_KINDS = [
  ts.SyntaxKind.TrueKeyword,
  ts.SyntaxKind.FalseKeyword,
  ts.SyntaxKind.NumericLiteral,
  ts.SyntaxKind.BigIntLiteral,
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.RegularExpressionLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.Identifier,
  ts.SyntaxKind.PrivateIdentifier,
  ts.SyntaxKind.ArrayLiteralExpression,
  ts.SyntaxKind.ObjectLiteralExpression,
  ts.SyntaxKind.PropertyAccessExpression,
  ts.SyntaxKind.ElementAccessExpression,
  ts.SyntaxKind.CallExpression,
  ts.SyntaxKind.NewExpression,
  ts.SyntaxKind.TaggedTemplateExpression,
  ts.SyntaxKind.TypeAssertionExpression,
  ts.SyntaxKind.ParenthesizedExpression,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.DeleteExpression,
  ts.SyntaxKind.TypeOfExpression,
  ts.SyntaxKind.VoidExpression,
  ts.SyntaxKind.AwaitExpression,
  ts.SyntaxKind.PrefixUnaryExpression,
  ts.SyntaxKind.PostfixUnaryExpression,
  ts.SyntaxKind.BinaryExpression,
  ts.SyntaxKind.ConditionalExpression,
  ts.SyntaxKind.TemplateExpression,
  ts.SyntaxKind.YieldExpression,
  ts.SyntaxKind.SpreadElement,
  ts.SyntaxKind.ClassExpression,
  ts.SyntaxKind.OmittedExpression,
  ts.SyntaxKind.ExpressionWithTypeArguments,
  ts.SyntaxKind.AsExpression,
  ts.SyntaxKind.NonNullExpression,
  ts.SyntaxKind.JsxExpression,
  ts.SyntaxKind.JsxElement,
  ts.SyntaxKind.JsxSelfClosingElement,
  ts.SyntaxKind.JsxFragment,
  ts.SyntaxKind.ExpressionWithTypeArguments,
  ts.SyntaxKind.SatisfiesExpression,
];

export const isExpression = (node: ts.Node): node is ts.Expression =>
  SYNTAX_KINDS.includes(node.kind);