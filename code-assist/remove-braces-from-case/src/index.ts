
import {
  CodeAssistMetadata,
  CodeAssistType,
} from "@p42/engine";
import { RemoveBracesFromCaseMatch } from "./RemoveBracesFromCaseMatch";
import { RemoveBracesFromCaseMatcher } from "./RemoveBracesFromCaseMatcher";
import { RemoveBracesFromCaseTransformation } from "./RemoveBracesFromCaseTransformation";
import metadata from "./code-assist.json";

export default class RemoveBracesFromCaseCodeAssist extends CodeAssistType<RemoveBracesFromCaseMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new RemoveBracesFromCaseMatcher(),
      [new RemoveBracesFromCaseTransformation()]
    );
  }
}
