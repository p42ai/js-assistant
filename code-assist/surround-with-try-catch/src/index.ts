
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { SurroundWithTryCatchCandidate } from "./SurroundWithTryCatchCandidate";
import { SurroundWithTryCatchMatcher } from "./SurroundWithTryCatchMatcher";
import { SurroundWithTryCatchTransformation } from "./SurroundWithTryCatchTransformation";

export default class SurroundWithTryCatchCodeAssist extends CodeAssistType<SurroundWithTryCatchCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new SurroundWithTryCatchMatcher(), [
      new SurroundWithTryCatchTransformation(),
    ]);
  }
}
