
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MoveLastStatementOutOfIfElseCandidate } from "./MoveLastStatementOutOfIfElseCandidate";
import { MoveLastStatementOutOfIfElseMatcher } from "./MoveLastStatementOutOfIfElseMatcher";
import { MoveLastStatementOutOfIfElseTransformation } from "./MoveLastStatementOutOfIfElseTransformation";

export default class MoveLastStatementOutOfIfElseCodeAssist extends CodeAssistType<MoveLastStatementOutOfIfElseCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveLastStatementOutOfIfElseMatcher(),
      [new MoveLastStatementOutOfIfElseTransformation()]
    );
  }
}
