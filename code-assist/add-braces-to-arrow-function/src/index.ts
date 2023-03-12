import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import { AddBracesToArrowFunctionMatch } from "./AddBracesToArrowFunctionMatch";
import { AddBracesToArrowFunctionMatcher } from "./AddBracesToArrowFunctionMatcher";
import { AddBracesToArrowFunctionTransformation } from "./AddBracesToArrowFunctionTransformation";
import metadata from "./code-assist.json";

export default class AddBracesToArrowFunctionCodeAssist extends CodeAssistType<AddBracesToArrowFunctionMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new AddBracesToArrowFunctionMatcher(),
      [new AddBracesToArrowFunctionTransformation()]
    );
  }
}
