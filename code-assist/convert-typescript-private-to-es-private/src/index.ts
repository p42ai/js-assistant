
import {
  CodeAssistMetadata,
  CodeAssistType,
} from "@p42/engine";
import { ConvertTypescriptPrivateToEsPrivateMatch } from "./ConvertTypescriptPrivateToEsPrivateMatch";
import { ConvertTypescriptPrivateToEsPrivateMatcher } from "./ConvertTypescriptPrivateToEsPrivateMatcher";
import { ConvertTypescriptPrivateToEsPrivateTransformation } from "./ConvertTypescriptPrivateToEsPrivateTransformation";
import metadata from "./code-assist.json";

export default class ConvertTypescriptPrivateToEsPrivateCodeAssist extends CodeAssistType<ConvertTypescriptPrivateToEsPrivateMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertTypescriptPrivateToEsPrivateMatcher(),
      [new ConvertTypescriptPrivateToEsPrivateTransformation()]
    );
  }
}
