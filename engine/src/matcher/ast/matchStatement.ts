import ts from "typescript";
import { isStatement } from "../../ast/Statement";
import * as b from "../builder";

import { Context } from "../engine/Context";
import * as p from "../predicate";
import { matchSingleStatementBlock } from "./matchBlock";

export function matchSingleStatementInOptionalBlock({
  statement,
}: {
  statement: p.Predicate<ts.Statement | undefined, Context>;
}) {
  return p.or(matchSingleStatementBlock({ statement }), statement);
}

export function matchStatement({
  parent = undefined,
  constraints = undefined,
}: {
  parent?: p.OptionalPredicate<ts.Node, Context>;
  constraints?: p.OptionalPredicateArray<ts.Statement, Context>;
} = {}) {
  return b.object(
    "statement",
    isStatement,
    b.mandatoryProperty("parent", parent),
    b.constraints(constraints)
  );
}
