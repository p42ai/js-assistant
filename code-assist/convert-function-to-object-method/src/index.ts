
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertFunctionToObjectMethodCandidate } from "./ConvertFunctionToObjectMethodCandidate";
import { ConvertFunctionToObjectMethodMatcher } from "./ConvertFunctionToObjectMethodMatcher";
import { ConvertFunctionToObjectMethodTransformation } from "./ConvertFunctionToObjectMethodTransformation";

export default class ConvertFunctionToObjectMethodCodeAssist extends CodeAssistType<ConvertFunctionToObjectMethodCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertFunctionToObjectMethodMatcher(),
      [new ConvertFunctionToObjectMethodTransformation()]
    );
  }
}
