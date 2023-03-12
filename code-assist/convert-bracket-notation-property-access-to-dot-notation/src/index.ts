
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertBracketNotationPropertyAccessToDotNotationCandidate } from "./ConvertBracketNotationPropertyAccessToDotNotationCandidate";
import { ConvertBracketNotationPropertyAccessToDotNotationMatcher } from "./ConvertBracketNotationPropertyAccessToDotNotationMatcher";
import { ConvertBracketNotationPropertyAccessToDotNotationTransformation } from "./ConvertBracketNotationPropertyAccessToDotNotationTransformation";

export default class ConvertBracketNotationPropertyAccessToDotNotationCodeAssist extends CodeAssistType<ConvertBracketNotationPropertyAccessToDotNotationCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertBracketNotationPropertyAccessToDotNotationMatcher(),
      [new ConvertBracketNotationPropertyAccessToDotNotationTransformation()]
    );
  }
}
