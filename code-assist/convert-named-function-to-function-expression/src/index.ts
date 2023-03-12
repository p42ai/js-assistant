
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertNamedFunctionToFunctionExpressionCandidate } from "./ConvertNamedFunctionToFunctionExpressionCandidate";
import { ConvertNamedFunctionToFunctionExpressionMatcher } from "./ConvertNamedFunctionToFunctionExpressionMatcher";
import { ConvertNamedFunctionToFunctionExpressionTransformation } from "./ConvertNamedFunctionToFunctionExpressionTransformation";

export default class ConvertNamedFunctionToFunctionExpressionCodeAssist extends CodeAssistType<ConvertNamedFunctionToFunctionExpressionCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertNamedFunctionToFunctionExpressionMatcher(),
      [new ConvertNamedFunctionToFunctionExpressionTransformation()]
    );
  }
}
