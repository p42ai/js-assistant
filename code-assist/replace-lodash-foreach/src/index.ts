
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ReplaceLodashForeachCandidate } from "./ReplaceLodashForeachCandidate";
import { ReplaceLodashForeachMatcher } from "./ReplaceLodashForeachMatcher";
import { ReplaceLodashForeachWithArrayForEachTransformation } from "./ReplaceLodashForeachWithArrayForEachTransformation";
import { ReplaceLodashForeachWithObjectValuesForEachTransformation } from "./ReplaceLodashForeachWithObjectValuesForEachTransformation";

export default class ReplaceLodashForeachCodeAssist extends CodeAssistType<ReplaceLodashForeachCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new ReplaceLodashForeachMatcher(), [
      new ReplaceLodashForeachWithArrayForEachTransformation(),
      new ReplaceLodashForeachWithObjectValuesForEachTransformation(),
    ]);
  }
}
