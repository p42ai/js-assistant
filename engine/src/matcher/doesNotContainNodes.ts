import ts from "typescript";
import { Context } from "./engine/Context";
import * as p from "./predicate";

export function doesNotContainNodes<T extends ts.Node>(
  predicate: p.Predicate<T, Context>
) {
  return p.define(
    "doesNotContainNodes",
    p.or(p.isUndefined, p.not(p.isDefined(p.some(predicate))))
  );
}
