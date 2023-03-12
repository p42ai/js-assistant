import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import { AddBracesMatch } from "./AddBracesMatch";
import { AddBracesMatcher } from "./AddBracesMatcher";
import { AddBracesToElseTransformation } from "./AddBracesToElseTransformation";
import { AddBracesTransformation } from "./AddBracesTransformation";
import metadata from "./code-assist.json";

export default class AddBracesCodeAssist extends CodeAssistType<AddBracesMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new AddBracesMatcher(), [
      new AddBracesTransformation(),
      new AddBracesToElseTransformation(),
    ]);
  }
}
