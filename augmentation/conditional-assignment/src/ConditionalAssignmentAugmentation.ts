import { MatchAugmentation } from "@p42/engine";
import { ConditionalAssignmentMatch } from "./ConditionalAssignmentMatch";
import { ConditionalAssignmentMatcher } from "./ConditionalAssignmentMatcher";

export const ConditionalAssignmentAugmentation =
  new MatchAugmentation<ConditionalAssignmentMatch>({
    id: "conditional-assignment",
    matchers: [ConditionalAssignmentMatcher],
  });
