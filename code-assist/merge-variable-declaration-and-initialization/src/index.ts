import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MergeVariableDeclarationAndInitializationCandidate } from "./MergeVariableDeclarationAndInitializationCandidate";
import { MergeVariableDeclarationAndInitializationMatcher } from "./MergeVariableDeclarationAndInitializationMatcher";
import { MergeVariableDeclarationAndInitializationTransformation } from "./MergeVariableDeclarationAndInitializationTransformation";

export default class MergeVariableDeclarationAndInitializationCodeAssist extends CodeAssistType<MergeVariableDeclarationAndInitializationCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MergeVariableDeclarationAndInitializationMatcher(),
      [new MergeVariableDeclarationAndInitializationTransformation()]
    );
  }
}
