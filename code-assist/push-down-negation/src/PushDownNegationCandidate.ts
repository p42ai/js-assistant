import { Match } from "@p42/engine";
import ts from "typescript";

export interface PushDownNegationCandidate
  extends Match<
    ts.PrefixUnaryExpression,
    {
      binaryExpression: ts.BinaryExpression;
      operator:
        | ts.SyntaxKind.AmpersandAmpersandToken
        | ts.SyntaxKind.BarBarToken
        | ts.SyntaxKind.EqualsEqualsEqualsToken
        | ts.SyntaxKind.EqualsEqualsToken
        | ts.SyntaxKind.ExclamationEqualsEqualsToken
        | ts.SyntaxKind.ExclamationEqualsToken
        | ts.SyntaxKind.GreaterThanEqualsToken
        | ts.SyntaxKind.GreaterThanToken
        | ts.SyntaxKind.LessThanEqualsToken
        | ts.SyntaxKind.LessThanToken;
    },
    undefined
  > {}
