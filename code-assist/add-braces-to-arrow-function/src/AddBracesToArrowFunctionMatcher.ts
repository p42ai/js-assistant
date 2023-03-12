import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { AddBracesToArrowFunctionMatch } from "./AddBracesToArrowFunctionMatch";

const { ast } = m;

export class AddBracesToArrowFunctionMatcher extends PatternMatcher<AddBracesToArrowFunctionMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.ArrowFunction],
  };

  constructor() {
    super(AddBracesToArrowFunctionMatch);
  }

  createPattern() {
    const captures = {
      bodyExpression: capture.node<ts.Expression>(),
    };

    return {
      match: ast.arrowFunction({
        body: ast.expression({
          constraints: [m.maybeParenthesized(captures.bodyExpression.record())],
        }),
      }),
      captures,
    };
  }
}
