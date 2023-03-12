
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertDotNotationPropertyAccessToBracketNotationCandidate } from "./ConvertDotNotationPropertyAccessToBracketNotationCandidate";
import { ConvertDotNotationPropertyAccessToBracketNotationMatcher } from "./ConvertDotNotationPropertyAccessToBracketNotationMatcher";
import { ConvertDotNotationPropertyAccessToBracketNotationTransformation } from "./ConvertDotNotationPropertyAccessToBracketNotationTransformation";

export default class ConvertDotNotationPropertyAccessToBracketNotationCodeAssist extends CodeAssistType<ConvertDotNotationPropertyAccessToBracketNotationCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertDotNotationPropertyAccessToBracketNotationMatcher(),
      [new ConvertDotNotationPropertyAccessToBracketNotationTransformation()]
    );
  }
}
