
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveUnnecessaryElseCandidate } from "./RemoveUnnecessaryElseCandidate";
import { RemoveUnnecessaryElseMatcher } from "./RemoveUnnecessaryElseMatcher";
import { RemoveUnnecessaryElseTransformation } from "./RemoveUnnecessaryElseTransformation";

export default class ConvertIfElseToGuardClauseCodeAssist extends CodeAssistType<RemoveUnnecessaryElseCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new RemoveUnnecessaryElseMatcher(), [
      new RemoveUnnecessaryElseTransformation(),
    ]);
  }
}
