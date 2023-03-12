
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveBracesFromElseTransformation } from "./RemoveBracesFromElseTransformation";
import { RemoveBracesMatch } from "./RemoveBracesMatch";
import { RemoveBracesMatcher } from "./RemoveBracesMatcher";
import { RemoveBracesTransformation } from "./RemoveBracesTransformation";

export default class RemoveBracesCodeAssist extends CodeAssistType<RemoveBracesMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new RemoveBracesMatcher(), [
      new RemoveBracesTransformation(),
      new RemoveBracesFromElseTransformation(),
    ]);
  }
}
