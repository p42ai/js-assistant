
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { InsertElseMatch } from "./InsertElseMatch";
import { InsertElseMatcher } from "./InsertElseMatcher";
import { InsertElseTransformation } from "./InsertElseTransformation";

export default class InsertElseCodeAssist extends CodeAssistType<InsertElseMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new InsertElseMatcher(), [
      new InsertElseTransformation(),
    ]);
  }
}
