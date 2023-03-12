import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import { AddBracesToCaseMatch } from "./AddBracesToCaseMatch";
import { AddBracesToCaseMatcher } from "./AddBracesToCaseMatcher";
import { AddBracesToCaseTransformation } from "./AddBracesToCaseTransformation";
import metadata from "./code-assist.json";

export default class AddBracesToCaseCodeAssist extends CodeAssistType<AddBracesToCaseMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new AddBracesToCaseMatcher(), [
      new AddBracesToCaseTransformation(),
    ]);
  }
}
