import ts from "typescript";
import { Context } from "../engine/Context";
import * as p from "../predicate";
import { matchBlock } from "./matchBlock.generated";
import { matchReturnStatement } from "./matchReturnStatement";

export function matchSingleStatementBlock({
  statement,
  constraints = undefined,
}: {
  statement: p.Predicate<ts.Statement, Context>;
  constraints?: p.OptionalPredicateArray<ts.Block, Context>;
  debugName?: string;
}) {
  return matchBlock({
    statements: p.array(statement),
    constraints,
  });
}

export function matchEmptyBlock({
  constraints = undefined,
  debugName = "EmptyBlock",
}: {
  constraints?: p.OptionalPredicateArray<ts.Block, Context>;
  debugName?: string;
} = {}) {
  return matchBlock({
    statements: p.array(),
    debugName,
    constraints,
  });
}

export function matchSingleStatementReturnBlock({
  returnExpression,
  constraints = undefined,
  debugName = "SingleStatementReturnBlock",
}: {
  returnExpression: p.Predicate<ts.Expression | undefined, Context>;
  constraints?: p.OptionalPredicateArray<ts.Block, Context>;
  debugName?: string;
}) {
  return matchSingleStatementBlock({
    statement: matchReturnStatement({
      expression: returnExpression,
    }),
    debugName,
    constraints,
  });
}
