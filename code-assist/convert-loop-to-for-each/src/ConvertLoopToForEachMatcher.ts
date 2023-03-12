
import {
  arrayLoop,
  ArrayLoopAugmentation,
  ArrayLoopMatch,
} from "@p42/augmentation-array-loop";
import { capture, PatternMatcher } from "@p42/engine";
import { ConvertLoopToForEachCandidate } from "./ConvertLoopToForEachCandidate";

export class ConvertLoopToForEachMatcher extends PatternMatcher<ConvertLoopToForEachCandidate> {
  candidates = {
    patterns: [ArrayLoopAugmentation],
  };

  requiredAugmentations = [ArrayLoopAugmentation];

  createPattern() {
    const captures = {
      arrayLoop: capture.value<ArrayLoopMatch>(),
    };

    return {
      match: arrayLoop({
        type: ["for-of", "for-element"],
        constraints: [captures.arrayLoop.record()],
      }),
      captures,
    };
  }
}
