
import { capture, Context, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import {
  RemoveDoubleNegationMatch,
  RemoveDoubleNegationMatchType,
} from "./RemoveDoubleNegationMatch";

const { ast, type } = m;

export class RemoveDoubleNegationMatcher extends PatternMatcher<RemoveDoubleNegationMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.PrefixUnaryExpression],
  };

  createMatch(
    node: RemoveDoubleNegationMatchType["node"],
    captures: RemoveDoubleNegationMatchType["captures"],
    data: RemoveDoubleNegationMatchType["data"],
    context: Context
  ): RemoveDoubleNegationMatch {
    return new RemoveDoubleNegationMatch(node, captures, data, context);
  }

  createPattern() {
    const captures = {
      expression: capture.node<ts.Expression>(),
    };

    return {
      match: ast.prefixUnaryExpression({
        operator: ts.SyntaxKind.ExclamationToken,
        operand: ast.prefixUnaryExpression({
          operator: ts.SyntaxKind.ExclamationToken,
          operand: m.maybeParenthesized(captures.expression.record()),
        }),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: RemoveDoubleNegationMatch["node"],
    captures: RemoveDoubleNegationMatch["captures"],
    context: Context
  ): RemoveDoubleNegationMatch["data"] {
    return {
      isBooleanExpression: type.boolean(captures.expression, context),
    };
  }
}
