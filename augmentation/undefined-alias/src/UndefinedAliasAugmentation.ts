import { MatchAugmentation } from "@p42/engine";
import { UndefinedAliasMatch } from "./UndefinedAliasMatch";
import { UndefinedLiteralMatcher } from "./UndefinedLiteralMatcher";
import { VoidConstantMatcher } from "./VoidConstantMatcher";

export const UndefinedAliasAugmentation =
  new MatchAugmentation<UndefinedAliasMatch>({
    id: "undefined-alias",
    matchers: [UndefinedLiteralMatcher, VoidConstantMatcher],
  });
