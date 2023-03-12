import { MatchAugmentation } from "@p42/engine";
import { LodashCallMatch } from "./LodashCallMatch";
import { LodashCallMatcher } from "./LodashCallMatcher";

export const LodashCallAugmentation = new MatchAugmentation<LodashCallMatch>({
  id: "lodash-call",
  matchers: [LodashCallMatcher],
});
