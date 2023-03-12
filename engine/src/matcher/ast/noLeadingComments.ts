import ts from "typescript";
import { getLeadingComments } from "../../ast/getLeadingComments";
import * as p from "../predicate";

export function noLeadingComments() {
  return p.define(
    "noLeadingComments",
    (node: ts.Node) => getLeadingComments(node) == null
  );
}
