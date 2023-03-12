import {
  capture,
  Context,
  hasDescendant,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { PushParameterIntoIifeCandidate } from "./PushParameterIntoIifeCandidate";

const { ast, constraint } = m;

export const pathFunctionParent =
  (matcher: p.Predicate<ts.ArrowFunction | ts.FunctionExpression, Context>) =>
  (parameter: ts.ParameterDeclaration, context: Context) => {
    const functionParent = parameter.parent;

    return ts.isArrowFunction(functionParent) ||
      ts.isFunctionExpression(functionParent)
      ? matcher(functionParent, context)
      : false;
  };

export class PushParameterIntoIifeMatcher extends PatternMatcher<PushParameterIntoIifeCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.Parameter],
  };

  createPattern() {
    const captures = {
      function: capture.node<ts.ArrowFunction | ts.FunctionExpression>(),
      callExpression: capture.node<ts.CallExpression>(),
    };

    const isIifeParameter = (
      functionParent: ts.ArrowFunction | ts.FunctionExpression,
      context: Context
    ) => {
      const parenthesesParent = functionParent.parent;

      if (!ts.isParenthesizedExpression(parenthesesParent)) {
        return false;
      }

      const callExpression = parenthesesParent.parent;
      const isCallExpression = ts.isCallExpression(callExpression);

      if (
        !isCallExpression ||
        callExpression.expression !== parenthesesParent
      ) {
        return false;
      }

      captures.callExpression.record()(callExpression, context);

      return true;
    };

    const isNotSelfReferencing = (
      functionParent: ts.ArrowFunction | ts.FunctionExpression,
      context: Context
    ) => {
      if (ts.isArrowFunction(functionParent)) {
        return true; // arguments are not bound in arrow functions
      }

      // named function expressions are excluded if the name is referenced,
      // which means they could be invoked and their signature must not be changed.
      if (functionParent.name != null) {
        const binding = context.getBinding(functionParent.name);
        if (binding != null && binding.references.length > 1) {
          return false;
        }
      }

      // TODO this match is too broad (e.g. when arguments is property)
      const usesArguments = hasDescendant(
        functionParent,
        ast.identifier({
          text: "arguments",
        }),
        context
      );

      return !usesArguments;
    };

    return {
      match: ast.parameter({
        initializer: p.isUndefined, // don't match when there is default
        constraints: [
          pathFunctionParent(
            captures.function.record({
              match: p.and(isIifeParameter, isNotSelfReferencing),
            })
          ),
          p.not(constraint.isParameterUsedInSubsequentParameterDefaults),
        ],
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: PushParameterIntoIifeCandidate["node"],
    captures: PushParameterIntoIifeCandidate["captures"]
  ): PushParameterIntoIifeCandidate["data"] {
    const parameter = matchedNode;
    const parameterIndex = captures.function.parameters.indexOf(parameter);
    return {
      argument: captures.callExpression.arguments[parameterIndex],
      type: ts.isArrowFunction(captures.function) ? "IIAF" : "IIFE",
    };
  }
}
