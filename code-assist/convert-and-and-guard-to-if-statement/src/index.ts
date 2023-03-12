import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertAndAndGuardToIfStatementCandidate } from "./ConvertAndAndGuardToIfStatementCandidate";
import { ConvertAndAndGuardToIfStatementMatcher } from "./ConvertAndAndGuardToIfStatementMatcher";
import { ConvertAndAndGuardToIfStatementTransformation } from "./ConvertAndAndGuardToIfStatementTransformation";

export default class ConvertAndAndGuardToIfStatementCodeAssist extends CodeAssistType<ConvertAndAndGuardToIfStatementCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertAndAndGuardToIfStatementMatcher(),
      [new ConvertAndAndGuardToIfStatementTransformation()]
    );
  }
}
