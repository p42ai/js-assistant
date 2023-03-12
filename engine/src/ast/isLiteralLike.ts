import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { GlobalProperties } from "./GlobalProperty";

export function isLiteralLike(node: ts.Node, context: Context): boolean {
  switch (node.kind) {
    case ts.SyntaxKind.BigIntLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
    case ts.SyntaxKind.NumericLiteral:
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.NullKeyword:
    case ts.SyntaxKind.TrueKeyword:
    case ts.SyntaxKind.FalseKeyword:
      return true;
    case ts.SyntaxKind.Identifier: {
      const identifier = node as ts.Identifier;
      const binding = context.getBinding(identifier);

      // assuming binding augmentation:
      // if there is no binding or it's not global, the identifier is not a standard JS global
      if (binding == null || !binding.isGlobal) {
        return false;
      }

      return GlobalProperties.includes(identifier.text);
    }
    default:
      return false;
  }
}
