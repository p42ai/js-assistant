import { Match } from "@p42/engine";
import ts from "typescript";

export interface SplitIfCandidate
  extends Match<
    ts.BinaryExpression,
    {
      ifStatement: ts.IfStatement;
      operator:
        | ts.SyntaxKind.BarBarToken
        | ts.SyntaxKind.AmpersandAmpersandToken;
    },
    undefined
  > {}
