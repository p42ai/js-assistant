import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertMathPowToExponentiationCandidate } from "./ConvertMathPowToExponentiationCandidate";
import { ConvertMathPowToExponentiationMatcher } from "./ConvertMathPowToExponentiationMatcher";
import { ConvertMathPowToExponentiationTransformation } from "./ConvertMathPowToExponentiationTransformation";

export default class ConvertMathPowToExponentiationCodeAssist extends CodeAssistType<ConvertMathPowToExponentiationCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertMathPowToExponentiationMatcher(),
      [new ConvertMathPowToExponentiationTransformation()]
    );
  }
}
