import ts from "typescript";
import * as b from "../builder";

export const matchAsyncKeyword = b.keyword(
  "asyncKeyword",
  ts.SyntaxKind.AsyncKeyword
);
