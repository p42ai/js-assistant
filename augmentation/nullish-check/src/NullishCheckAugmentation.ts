import { MatchAugmentation } from "@p42/engine";
import { NullishCheckMatch } from "./NullishCheckMatch";
import { NullishCheckMatcher } from "./NullishCheckMatcher";

export const NullishCheckAugmentation =
  new MatchAugmentation<NullishCheckMatch>({
    id: "nullish-check",
    matchers: [NullishCheckMatcher],
  });
