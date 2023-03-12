
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveDoubleNegationMatch } from "./RemoveDoubleNegationMatch";
import { RemoveDoubleNegationMatcher } from "./RemoveDoubleNegationMatcher";
import { RemoveDoubleNegationTransformation } from "./RemoveDoubleNegationTransformation";

export default class RemoveDoubleNegationCodeAssist extends CodeAssistType<RemoveDoubleNegationMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new RemoveDoubleNegationMatcher(), [
      new RemoveDoubleNegationTransformation(),
    ]);
  }
}
