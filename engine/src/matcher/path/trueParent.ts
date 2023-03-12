import ts from "typescript";
import { Context } from "../engine/Context";
import { Predicate } from "../predicate/Predicate";

export const trueParent =
  (matcher: Predicate<ts.Node, Context>) => (node: ts.Node, context: Context) =>
    matcher(context.getTrueParent(node), context);
