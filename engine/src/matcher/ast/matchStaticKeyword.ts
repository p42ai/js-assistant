import ts from "typescript";
import * as b from "../builder";

export const matchStaticKeyword = b.keyword(
  "staticKeyword",
  ts.SyntaxKind.StaticKeyword
);
