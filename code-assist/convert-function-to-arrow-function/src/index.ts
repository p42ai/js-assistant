
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertFunctionToArrowFunctionCandidate } from "./ConvertFunctionToArrowFunctionCandidate";
import { ConvertFunctionToArrowFunctionMatcher } from "./ConvertFunctionToArrowFunctionMatcher";
import { ConvertFunctionToArrowFunctionTransformation } from "./ConvertFunctionToArrowFunctionTransformation";

export default class ConvertFunctionToArrowFunctionCodeAssist extends CodeAssistType<ConvertFunctionToArrowFunctionCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertFunctionToArrowFunctionMatcher(),
      [new ConvertFunctionToArrowFunctionTransformation()]
    );
  }
}
