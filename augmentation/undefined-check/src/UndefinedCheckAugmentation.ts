import { MatchAugmentation } from "@p42/engine";
import { UndefinedCheckMatch } from "./UndefinedCheckMatch";
import { UndefinedCheckMatcher } from "./UndefinedCheckMatcher";

export const UndefinedCheckAugmentation =
  new MatchAugmentation<UndefinedCheckMatch>({
    id: "undefined-check",
    matchers: [UndefinedCheckMatcher],
  });
