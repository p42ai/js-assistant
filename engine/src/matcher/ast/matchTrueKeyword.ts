import ts from "typescript";
import * as b from "../builder";

export const matchTrueKeyword = b.keyword(
  "trueKeyword",
  ts.SyntaxKind.TrueKeyword
);
