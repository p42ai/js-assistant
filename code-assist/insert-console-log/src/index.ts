
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { InsertConsoleLogCandidate } from "./InsertConsoleLogCandidate";
import { InsertConsoleLogMatcher } from "./InsertConsoleLogMatcher";
import { InsertConsoleLogTransformation } from "./InsertConsoleLogTransformation";

export default class InsertConsoleLogCodeAssist extends CodeAssistType<InsertConsoleLogCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new InsertConsoleLogMatcher(), [
      new InsertConsoleLogTransformation(),
    ]);
  }
}
