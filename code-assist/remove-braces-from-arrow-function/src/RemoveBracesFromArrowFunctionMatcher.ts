import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { RemoveBracesFromArrowFunctionMatch } from "./RemoveBracesFromArrowFunctionMatch";

const { ast } = m;

export class RemoveBracesFromArrowFunctionMatcher extends PatternMatcher<RemoveBracesFromArrowFunctionMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.ArrowFunction],
  };

  constructor() {
    super(RemoveBracesFromArrowFunctionMatch);
  }

  createPattern() {
    const captures = {
      returnedExpression: capture.node<ts.Expression>(),
    };

    return {
      match: ast.arrowFunction({
        body: ast.singleStatementBlock({
          statement: ast.returnStatement({
            expression: captures.returnedExpression.record({
              match: ast.expression(),
            }),
          }),
        }),
      }),
      captures,
    };
  }
}
