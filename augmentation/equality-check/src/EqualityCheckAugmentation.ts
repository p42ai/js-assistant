import { MatchAugmentation } from "@p42/engine";
import { EqualityCheckMatch } from "./EqualityCheckMatch";
import { EqualityCheckMatcher } from "./EqualityCheckMatcher";
import { InvertedEqualityCheckMatcher } from "./InvertedEqualityCheckMatcher";

export const EqualityCheckAugmentation =
  new MatchAugmentation<EqualityCheckMatch>({
    id: "equality-check",
    matchers: [EqualityCheckMatcher, InvertedEqualityCheckMatcher],
  });
