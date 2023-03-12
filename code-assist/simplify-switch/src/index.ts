
import {
  CodeAssistMetadata,
  CodeAssistType,
} from "@p42/engine";
import { SimplifySwitchMatch } from "./SimplifySwitchMatch";
import { SimplifySwitchMatcher } from "./SimplifySwitchMatcher";
import { SimplifySwitchTransformation } from "./SimplifySwitchTransformation";
import metadata from "./code-assist.json";

export default class SimplifySwitchCodeAssist extends CodeAssistType<SimplifySwitchMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new SimplifySwitchMatcher(),
      [new SimplifySwitchTransformation()]
    );
  }
}
