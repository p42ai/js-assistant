import ts from "typescript";
import * as p from "./predicate";

export const loop = p.or(
  ts.isForStatement,
  ts.isForOfStatement,
  ts.isForInStatement,
  ts.isDoStatement,
  ts.isWhileStatement
);
