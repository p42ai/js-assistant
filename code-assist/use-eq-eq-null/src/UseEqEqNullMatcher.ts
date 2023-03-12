
import EqualityCheckAugmentation from "@p42/augmentation-equality-check";
import {
  nullishCheck,
  NullishCheckAugmentation,
} from "@p42/augmentation-nullish-check";
import UndefinedAliasAugmentation from "@p42/augmentation-undefined-alias";
import { capture, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { UseEqEqNullCandidate } from "./UseEqEqNullCandidate";

export class UseEqEqNullMatcher extends PatternMatcher<UseEqEqNullCandidate> {
  candidates = {
    patterns: [NullishCheckAugmentation],
  };

  requiredAugmentations = [
    UndefinedAliasAugmentation,
    EqualityCheckAugmentation,
    NullishCheckAugmentation,
  ];

  createPattern() {
    const captures = {
      isNegated: capture.value<boolean>(),
      checkedExpression: capture.node<ts.Expression>(),
    };

    return {
      match: nullishCheck({
        checkType: "EQ_EQ_EQ_NULL_OR_UNDEFINED",
        checkedExpression: captures.checkedExpression.record(),
        isNegated: captures.isNegated.record(),
      }),
      captures,
    };
  }
}
