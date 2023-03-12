
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertNewArrayToArrayLiteralMatch } from "./ConvertNewArrayToArrayLiteralMatch";
import { ConvertNewArrayToArrayLiteralMatcher } from "./ConvertNewArrayToArrayLiteralMatcher";
import { ConvertNewArrayToArrayLiteralTransformation } from "./ConvertNewArrayToArrayLiteralTransformation";

export default class ConvertNewArrayToArrayLiteralCodeAssist extends CodeAssistType<ConvertNewArrayToArrayLiteralMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertNewArrayToArrayLiteralMatcher(),
      [new ConvertNewArrayToArrayLiteralTransformation()]
    );
  }
}
