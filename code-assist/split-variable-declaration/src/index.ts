
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { SplitVariableDeclarationCandidate } from "./SplitVariableDeclarationCandidate";
import { SplitVariableDeclarationMatcher } from "./SplitVariableDeclarationMatcher";
import { SplitVariableDeclarationTransformation } from "./SplitVariableDeclarationTransformation";

export default class SplitVariableDeclarationCodeAssist extends CodeAssistType<SplitVariableDeclarationCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new SplitVariableDeclarationMatcher(),
      [new SplitVariableDeclarationTransformation()]
    );
  }
}
