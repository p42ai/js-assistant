
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MoveIfElseIfBranchesDownTransformation } from "./MoveIfElseIfBranchesDownTransformation";
import { MoveIfElseIfBranchesMatch } from "./MoveIfElseIfBranchesMatch";
import { MoveIfElseIfBranchesMatcher } from "./MoveIfElseIfBranchesMatcher";
import { MoveIfElseIfBranchesUpTransformation } from "./MoveIfElseIfBranchesUpTransformation";

export default class MoveIfElseIfBranchesCodeAssist extends CodeAssistType<MoveIfElseIfBranchesMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new MoveIfElseIfBranchesMatcher(), [
      new MoveIfElseIfBranchesUpTransformation(),
      new MoveIfElseIfBranchesDownTransformation(),
    ]);
  }
}
