import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertMathPowToExponentiationCandidate } from "./ConvertMathPowToExponentiationCandidate";

const { ast } = m;

export class ConvertMathPowToExponentiationMatcher extends PatternMatcher<ConvertMathPowToExponentiationCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.CallExpression],
  };

  createPattern() {
    const captures = {
      base: capture.node<ts.Expression>(),
      exponent: capture.node<ts.Expression>(),
    };

    return {
      match: ast.callExpression({
        expression: ast.propertyAccessExpression({
          expression: ast.identifier({
            text: "Math",
          }),
          name: ast.identifier({
            text: "pow",
          }),
        }),
        args: p.array(captures.base.record(), captures.exponent.record()),
      }),
      captures,
    };
  }
}
