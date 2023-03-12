import ts from "typescript";
import { isBlockLike } from "../../ast/BlockLike";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchBlockLike({
  statements = undefined,
  constraints = undefined,
  debugName = "blockLike",
}: {
  statements?: p.OptionalPredicate<ts.NodeArray<ts.Statement>, Context>;
  constraints?: p.OptionalPredicateArray<ts.BlockLike, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    isBlockLike,
    b.mandatoryProperty("statements", statements),
    b.constraints(constraints)
  );
}
