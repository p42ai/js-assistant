import {
  arrayLoop,
  ArrayLoopAugmentation,
  ArrayLoopMatch,
} from "@p42/augmentation-array-loop";
import { capture, PatternMatcher } from "@p42/engine";
import { ConvertLoopToForWithIndexCandidate } from "./ConvertLoopToForWithIndexCandidate";

export class ConvertLoopToForWithIndexMatcher extends PatternMatcher<ConvertLoopToForWithIndexCandidate> {
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
        type: "for-of",
        constraints: [captures.arrayLoop.record()],
      }),
      captures,
    };
  }
}
