import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { FunctionDirectiveMatch } from "./FunctionDirectiveMatch";

const { ast } = m;

export class FunctionDirectiveMatcher extends PatternMatcher<FunctionDirectiveMatch> {
  candidates = {
    nodes: [
      ts.SyntaxKind.FunctionDeclaration,
      ts.SyntaxKind.FunctionExpression,
    ],
  };

  createPattern() {
    const captures = {
      directive: capture.node<ts.StringLiteral>(),
    };

    const body = ast.block({
      statements: p.firstArrayElements(
        ast.expressionStatement({
          expression: captures.directive.record({
            match: ast.stringLiteral(),
          }),
        })
      ),
    });

    return {
      match: p.or(
        ast.functionExpression({
          body,
        }),
        ast.functionDeclaration({
          body,
        })
      ),
      captures,
    };
  }
}
