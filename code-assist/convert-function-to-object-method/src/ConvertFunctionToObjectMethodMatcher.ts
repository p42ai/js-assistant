import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ConvertFunctionToObjectMethodCandidate } from "./ConvertFunctionToObjectMethodCandidate";

const { ast } = m;

export class ConvertFunctionToObjectMethodMatcher extends PatternMatcher<ConvertFunctionToObjectMethodCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.PropertyAssignment],
  };

  createPattern() {
    const captures = {
      name: capture.value<string>(),
      functionExpression: capture.node<ts.FunctionExpression>(),
    };

    return {
      match: ast.propertyAssignment({
        name: ast.identifier({
          text: captures.name.record(),
        }),
        initializer: captures.functionExpression.record({
          match: ast.functionExpression(),
        }),
      }),
      captures,
    };
  }
}
