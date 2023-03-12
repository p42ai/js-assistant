
import EqualityCheckAugmentation, {
  equalityCheck,
} from "@p42/augmentation-equality-check";
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { UseStringStartsWithCandidate } from "./UseStringStartsWithCandidate";

const { ast, type } = m;

export class UseStringStartsWithMatcher extends PatternMatcher<UseStringStartsWithCandidate> {
  readonly requiresDeduplication: boolean = true;

  candidates = {
    patterns: [EqualityCheckAugmentation],
  };

  requiredAugmentations = [EqualityCheckAugmentation];

  createPattern() {
    const captures = {
      targetString: capture.node<ts.Identifier>(),
      testedCharacter: capture.node<ts.StringLiteral>(),
      isNegated: capture.value<boolean>(),
    };

    const targetString = captures.targetString.record({
      match: ast.identifier({
        constraints: [type.string],
      }),
    });

    const firstIndexExpression = ast.numericLiteral({ text: "0" });

    return {
      match: equalityCheck({
        part1: p.or(
          ast.elementAccessExpression({
            expression: targetString,
            argumentExpression: firstIndexExpression,
          }),
          ast.callExpression({
            expression: ast.propertyAccessExpression({
              expression: targetString,
              name: ast.identifier({ text: "charAt" }),
            }),
            args: p.array(firstIndexExpression),
          })
        ),
        part2: captures.testedCharacter.record({
          match: ast.stringLiteral({
            text: m.string.hasLength(1),
          }),
        }),
        isNegated: captures.isNegated.record(),
      }),
      captures,
    };
  }
}
