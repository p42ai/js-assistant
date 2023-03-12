import ts from "typescript";
import * as p from "../predicate";

export const buildKeyword = (name: string, kind: ts.SyntaxKind) =>
  p.define(name, (node: ts.Node) => node.kind === kind);
