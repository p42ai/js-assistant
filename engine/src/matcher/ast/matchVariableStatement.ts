import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchVariableStatement({
  debugName = "variableStatement",
  parent = undefined,
  constraints = undefined,
  declarationList = undefined,
}: {
  debugName?: string;
  parent?: p.OptionalPredicate<ts.VariableStatement["parent"], Context>;
  constraints?: p.OptionalPredicateArray<ts.VariableStatement, Context>;
  declarationList?: p.OptionalPredicate<ts.VariableDeclarationList, Context>;
} = {}) {
  return b.object(
    debugName,
    ts.isVariableStatement,
    b.mandatoryProperty("declarationList", declarationList),
    b.parentNode(parent),
    b.constraints(constraints)
  );
}
