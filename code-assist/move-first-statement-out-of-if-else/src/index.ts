
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MoveFirstStatementOutOfIfElseCandidate } from "./MoveFirstStatementOutOfIfElseCandidate";
import { MoveFirstStatementOutOfIfElseMatcher } from "./MoveFirstStatementOutOfIfElseMatcher";
import { MoveFirstStatementOutOfIfElseTransformation } from "./MoveFirstStatementOutOfIfElseTransformation";

export default class MoveFirstStatementOutOfIfElseCodeAssist extends CodeAssistType<MoveFirstStatementOutOfIfElseCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveFirstStatementOutOfIfElseMatcher(),
      [new MoveFirstStatementOutOfIfElseTransformation()]
    );
  }
}
