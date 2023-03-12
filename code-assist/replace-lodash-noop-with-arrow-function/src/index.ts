
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ReplaceLodashNoopWithArrowFunctionCandidate } from "./ReplaceLodashNoopWithArrowFunctionCandidate";
import { ReplaceLodashNoopWithArrowFunctionMatcher } from "./ReplaceLodashNoopWithArrowFunctionMatcher";
import { ReplaceLodashNoopWithArrowFunctionTransformation } from "./ReplaceLodashNoopWithArrowFunctionTransformation";

export default class ReplaceLodashNoopWithArrowFunctionCodeAssist extends CodeAssistType<ReplaceLodashNoopWithArrowFunctionCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ReplaceLodashNoopWithArrowFunctionMatcher(),
      [new ReplaceLodashNoopWithArrowFunctionTransformation()]
    );
  }
}
