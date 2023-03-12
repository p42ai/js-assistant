
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertConditionalExpressionToIfElseCandidate } from "./ConvertConditionalExpressionToIfElseCandidate";
import { ConvertConditionalExpressionToIfElseMatcher } from "./ConvertConditionalExpressionToIfElseMatcher";
import { ConvertConditionalExpressionToIfElseTransformation } from "./ConvertConditionalExpressionToIfElseTransformation";

export default class ConvertConditionalExpressionToIfElseCodeAssist extends CodeAssistType<ConvertConditionalExpressionToIfElseCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertConditionalExpressionToIfElseMatcher(),
      [new ConvertConditionalExpressionToIfElseTransformation()]
    );
  }
}
