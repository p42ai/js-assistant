import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { EqualityCheckMatch } from "./EqualityCheckMatch";

const { ast } = m;

export class EqualityCheckMatcher extends PatternMatcher<EqualityCheckMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  createPattern() {
    const captures = {
      part1: capture.node<ts.Expression>(),
      part2: capture.node<ts.Expression>(),
      isStrict: capture.value<boolean>(),
      isNegated: capture.value<boolean>(),
    };

    return {
      match: ast.binaryExpression({
        left: captures.part1.record(),
        right: captures.part2.record(),
        operator: captures.isStrict.record({
          value: (operator: ts.SyntaxKind) =>
            operator === ts.SyntaxKind.EqualsEqualsEqualsToken ||
            operator === ts.SyntaxKind.ExclamationEqualsEqualsToken,
          match: captures.isNegated.record({
            value: (operator: ts.SyntaxKind) =>
              operator === ts.SyntaxKind.ExclamationEqualsToken ||
              operator === ts.SyntaxKind.ExclamationEqualsEqualsToken,
            match: p.toPrimitivePredicate<ts.BinaryOperator, Context>([
              ts.SyntaxKind.EqualsEqualsEqualsToken,
              ts.SyntaxKind.ExclamationEqualsEqualsToken,
              ts.SyntaxKind.EqualsEqualsToken,
              ts.SyntaxKind.ExclamationEqualsToken,
            ]),
          }),
        }),
      }),
      captures,
    };
  }
}
