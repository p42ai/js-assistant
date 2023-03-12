import ts from "typescript";
import { Context } from "../engine/Context";
import { define } from "../predicate";
import { OptionalPredicate } from "../predicate/OptionalPredicate";
import { Predicate } from "../predicate/Predicate";

export const buildParentNode = <
  T extends ts.Node & { parent: S },
  S extends ts.Node
>(
  matcher: OptionalPredicate<S, Context>
): Predicate<T, Context> | undefined =>
  matcher != null
    ? define("parent", (node: T, context: Context) =>
        matcher(node.parent, context)
      )
    : undefined;
