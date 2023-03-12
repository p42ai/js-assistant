
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { SelectExpressionOccurrencesMatch } from "./SelectExpressionOccurrencesMatch";
import { SelectExpressionOccurrencesMatcher } from "./SelectExpressionOccurrencesMatcher";
import { SelectExpressionOccurrencesTransformation } from "./SelectExpressionOccurrencesTransformation";

export default class SelectExpressionOccurrencesCodeAssist extends CodeAssistType<SelectExpressionOccurrencesMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new SelectExpressionOccurrencesMatcher(),
      [new SelectExpressionOccurrencesTransformation()]
    );
  }
}
