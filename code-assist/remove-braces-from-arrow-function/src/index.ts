
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveBracesFromArrowFunctionMatch } from "./RemoveBracesFromArrowFunctionMatch";
import { RemoveBracesFromArrowFunctionMatcher } from "./RemoveBracesFromArrowFunctionMatcher";
import { RemoveBracesFromArrowFunctionTransformation } from "./RemoveBracesFromArrowFunctionTransformation";

export default class RemoveBracesFromArrowFunctionCodeAssist extends CodeAssistType<RemoveBracesFromArrowFunctionMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new RemoveBracesFromArrowFunctionMatcher(),
      [new RemoveBracesFromArrowFunctionTransformation()]
    );
  }
}
