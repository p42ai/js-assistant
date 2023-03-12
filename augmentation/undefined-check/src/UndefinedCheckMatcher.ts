import EqualityCheckAugmentation, {
  equalityCheck,
} from "@p42/augmentation-equality-check";
import UndefinedAliasAugmentation, {
  undefinedAlias,
} from "@p42/augmentation-undefined-alias";
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { UndefinedCheckMatch, UndefinedCheckType } from "./UndefinedCheckMatch";

const { ast } = m;

export class UndefinedCheckMatcher extends PatternMatcher<UndefinedCheckMatch> {
  candidates = {
    patterns: [EqualityCheckAugmentation],
  };

  requiredAugmentations = [
    EqualityCheckAugmentation,
    UndefinedAliasAugmentation,
  ];

  createPattern() {
    const captures = {
      checkedExpression: capture.node<ts.Expression>(),
      isNegated: capture.value<boolean>(),
      checkType: capture.value<UndefinedCheckType>(),
    };

    const checkedExpression = captures.checkedExpression.record({
      match: ast.identifier({
        text: p.and(p.isString, p.not(p.same("undefined"))),
      }),
    });

    return {
      match: p.or(
        captures.checkType.record({
          value: "TYPEOF_EQ_EQ_EQ_UNDEFINED",
          match: equalityCheck({
            part1: ast.typeOfExpression({
              expression: checkedExpression,
            }),
            part2: ast.undefinedStringLiteral,
            isNegated: captures.isNegated.record(),
            isStrict: true,
          }),
        }),
        captures.checkType.record({
          value: "TYPEOF_EQ_EQ_UNDEFINED",
          match: equalityCheck({
            part1: ast.typeOfExpression({
              expression: checkedExpression,
            }),
            part2: ast.undefinedStringLiteral,
            isNegated: captures.isNegated.record(),
            isStrict: false,
          }),
        }),
        captures.checkType.record({
          value: "EQ_EQ_EQ_UNDEFINED",
          match: equalityCheck({
            part1: checkedExpression,
            part2: undefinedAlias(),
            isNegated: captures.isNegated.record(),
            isStrict: true,
          }),
        })
      ),
      captures,
    };
  }
}
