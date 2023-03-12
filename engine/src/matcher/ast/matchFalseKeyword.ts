import ts from "typescript";
import * as b from "../builder";

export const matchFalseKeyword = b.keyword(
  "falseKeyword",
  ts.SyntaxKind.FalseKeyword
);
