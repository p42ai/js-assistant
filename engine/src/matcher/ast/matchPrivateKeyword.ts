import ts from "typescript";
import * as b from "../builder";

export const matchPrivateKeyword = b.keyword(
  "privateKeyword",
  ts.SyntaxKind.PrivateKeyword
);
