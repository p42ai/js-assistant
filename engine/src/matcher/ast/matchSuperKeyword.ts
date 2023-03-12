import ts from "typescript";
import * as b from "../builder";

export const matchSuperKeyword = b.keyword(
  "superKeyword",
  ts.SyntaxKind.SuperKeyword
);
