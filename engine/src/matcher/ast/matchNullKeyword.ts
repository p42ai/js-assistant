import ts from "typescript";
import * as b from "../builder";

export const matchNullKeyword = b.keyword(
  "nullKeyword",
  ts.SyntaxKind.NullKeyword
);
