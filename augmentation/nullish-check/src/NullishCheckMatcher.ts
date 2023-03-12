import EqualityCheckAugmentation, {
  equalityCheck,
} from "@p42/augmentation-equality-check";
import UndefinedAliasAugmentation, {
  nullishConstant,
  undefinedAlias,
} from "@p42/augmentation-undefined-alias";
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { NullishCheckMatch, NullishCheckType } from "./NullishCheckMatch";

const { ast } = m;

export class NullishCheckMatcher extends PatternMatcher<NullishCheckMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
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
      checkType: capture.value<NullishCheckType>(),
    };

    // TODO find more flexible way to reset captures, so that
    // 'undefined'/'null' string exclusion is not necessary
    const recordCheckedExpression = captures.checkedExpression.record({
      match: p.not(nullishConstant),
      overwrite: true,
    });

    return {
      match: p.or(
        captures.checkType.record({
          value: "EQ_EQ_EQ_NULL_OR_UNDEFINED",
          match: captures.isNegated.record({
            value: false,
            match: ast.binaryExpressionWithoutOrder({
              part1: equalityCheck({
                part1: recordCheckedExpression,
                part2: ast.nullKeyword,
                isNegated: false,
                isStrict: true,
              }),
              operator: ts.SyntaxKind.BarBarToken,
              part2: equalityCheck({
                part1: recordCheckedExpression,
                part2: undefinedAlias(),
                isNegated: false,
                isStrict: true,
              }),
            }),
          }),
        }),
        captures.checkType.record({
          value: "EQ_EQ_EQ_NULL_OR_UNDEFINED",
          match: captures.isNegated.record({
            value: true,
            match: ast.binaryExpressionWithoutOrder({
              part1: equalityCheck({
                part1: recordCheckedExpression,
                part2: ast.nullKeyword,
                isNegated: true,
                isStrict: true,
              }),
              operator: ts.SyntaxKind.AmpersandAmpersandToken,
              part2: equalityCheck({
                part1: recordCheckedExpression,
                part2: undefinedAlias(),
                isNegated: true,
                isStrict: true,
              }),
            }),
          }),
        }),
        captures.checkType.record({
          value: "EQ_EQ_NULL",
          match: equalityCheck({
            part1: recordCheckedExpression,
            part2: ast.nullKeyword,
            isStrict: false,
            isNegated: captures.isNegated.record(),
          }),
        }),
        captures.checkType.record({
          value: "EQ_EQ_UNDEFINED",
          match: equalityCheck({
            part1: recordCheckedExpression,
            part2: undefinedAlias(),
            isStrict: false,
            isNegated: captures.isNegated.record(),
          }),
        })
      ),
      captures,
    };
  }
}
