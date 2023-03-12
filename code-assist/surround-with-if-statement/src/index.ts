
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { SurroundWithIfStatementMatch } from "./SurroundWithIfStatementMatch";
import { SurroundWithIfStatementMatcher } from "./SurroundWithIfStatementMatcher";
import { SurroundWithIfStatementTransformation } from "./SurroundWithIfStatementTransformation";

export default class SurroundWithIfStatementCodeAssist extends CodeAssistType<SurroundWithIfStatementMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new SurroundWithIfStatementMatcher(),
      [new SurroundWithIfStatementTransformation()]
    );
  }
}
