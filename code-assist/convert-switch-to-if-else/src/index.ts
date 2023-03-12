
import {
  CodeAssistMetadata,
  CodeAssistType,
} from "@p42/engine";
import { ConvertSwitchToIfElseMatch } from "./ConvertSwitchToIfElseMatch";
import { ConvertSwitchToIfElseMatcher } from "./ConvertSwitchToIfElseMatcher";
import { ConvertSwitchToIfElseTransformation } from "./ConvertSwitchToIfElseTransformation";
import metadata from "./code-assist.json";

export default class ConvertSwitchToIfElseCodeAssist extends CodeAssistType<ConvertSwitchToIfElseMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertSwitchToIfElseMatcher(),
      [new ConvertSwitchToIfElseTransformation()]
    );
  }
}
