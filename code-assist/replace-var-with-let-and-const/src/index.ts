
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ReplaceVarWithLetAndConstCandidate } from "./ReplaceVarWithLetAndConstCandidate";
import { ReplaceVarWithLetAndConstMatcher } from "./ReplaceVarWithLetAndConstMatcher";
import { ReplaceVarWithLetAndConstTransformation } from "./ReplaceVarWithLetAndConstTransformation";

export default class ReplaceVarWithLetAndConstCodeAssist extends CodeAssistType<ReplaceVarWithLetAndConstCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ReplaceVarWithLetAndConstMatcher(),
      [new ReplaceVarWithLetAndConstTransformation()]
    );
  }
}
