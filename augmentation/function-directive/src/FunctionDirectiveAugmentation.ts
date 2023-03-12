import { MatchAugmentation } from "@p42/engine";
import { FunctionDirectiveMatch } from "./FunctionDirectiveMatch";
import { FunctionDirectiveMatcher } from "./FunctionDirectiveMatcher";

export const FunctionDirectiveAugmentation =
  new MatchAugmentation<FunctionDirectiveMatch>({
    id: "function-directive",
    matchers: [FunctionDirectiveMatcher],
  });
