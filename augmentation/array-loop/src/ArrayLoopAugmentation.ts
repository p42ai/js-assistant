import { MatchAugmentation } from "@p42/engine";
import { ArrayLoopMatch } from "./ArrayLoopMatch";
import { ForEachLoopMatcher } from "./ForEachLoopMatcher";
import { ForLoopMatcher } from "./ForLoopMatcher";
import { ForOfLoopMatcher } from "./ForOfLoopMatcher";

export const ArrayLoopAugmentation = new MatchAugmentation<ArrayLoopMatch>({
  id: "array-loop",
  matchers: [ForLoopMatcher, ForOfLoopMatcher, ForEachLoopMatcher],
});
