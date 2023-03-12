import ts from "typescript";
import { Context } from "../engine/Context";
import { Predicate } from "../predicate/Predicate";

export const parent =
  (matcher: Predicate<ts.Node, Context>) => (node: ts.Node, context: Context) =>
    matcher(node.parent, context);
