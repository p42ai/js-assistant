
import {
  CodeAssistMetadata,
  CodeAssistType,
} from "@p42/engine";
import { ConvertEsPrivateToTypescriptPrivateMatch } from "./ConvertEsPrivateToTypescriptPrivateMatch";
import { ConvertEsPrivateToTypescriptPrivateMatcher } from "./ConvertEsPrivateToTypescriptPrivateMatcher";
import { ConvertEsPrivateToTypescriptPrivateTransformation } from "./ConvertEsPrivateToTypescriptPrivateTransformation";
import metadata from "./code-assist.json";

export default class ConvertEsPrivateToTypescriptPrivateCodeAssist extends CodeAssistType<ConvertEsPrivateToTypescriptPrivateMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertEsPrivateToTypescriptPrivateMatcher(),
      [new ConvertEsPrivateToTypescriptPrivateTransformation()]
    );
  }
}
