
import { Context, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ConvertNamedFunctionToFunctionExpressionCandidate } from "./ConvertNamedFunctionToFunctionExpressionCandidate";

const { ast } = m;

export class ConvertNamedFunctionToFunctionExpressionMatcher extends PatternMatcher<ConvertNamedFunctionToFunctionExpressionCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.FunctionDeclaration],
  };

  createPattern() {
    const captures = {};

    const hasName = (functionDeclaration: ts.FunctionDeclaration) =>
      functionDeclaration.name != null;

    const isNotOverloaded = (
      namedFunction: ts.FunctionDeclaration,
      context: Context
    ): boolean => {
      const identifier = namedFunction.name!;
      const binding = context.getBinding(identifier);
      return binding?.declaringNodes.length === 1;
    };

    return {
      match: ast.functionDeclaration({
        constraints: [hasName, isNotOverloaded],
      }),
      captures,
    };
  }
}
