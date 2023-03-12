
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { SplitVariableDeclarationAndInitializationCandidate } from "./SplitVariableDeclarationAndInitializationCandidate";
import { SplitVariableDeclarationAndInitializationMatcher } from "./SplitVariableDeclarationAndInitializationMatcher";
import { SplitVariableDeclarationAndInitializationTransformation } from "./SplitVariableDeclarationAndInitializationTransformation";

export default class SplitVariableDeclarationAndInitializationCodeAssist extends CodeAssistType<SplitVariableDeclarationAndInitializationCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new SplitVariableDeclarationAndInitializationMatcher(),
      [new SplitVariableDeclarationAndInitializationTransformation()]
    );
  }
}
