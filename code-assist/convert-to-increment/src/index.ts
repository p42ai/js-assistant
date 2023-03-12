
import {
  CodeAssistMetadata,
  CodeAssistType,
} from "@p42/engine";
import { ConvertToIncrementMatch } from "./ConvertToIncrementMatch";
import { ConvertToIncrementMatcher } from "./ConvertToIncrementMatcher";
import { ConvertToIncrementTransformation } from "./ConvertToIncrementTransformation";
import metadata from "./code-assist.json";

export default class ConvertToIncrementCodeAssist extends CodeAssistType<ConvertToIncrementMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertToIncrementMatcher(),
      [new ConvertToIncrementTransformation()]
    );
  }
}
