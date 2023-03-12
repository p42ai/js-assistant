
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveRedundantElseMatch } from "./RemoveRedundantElseMatch";
import { RemoverRedundantElseMatcher } from "./RemoveRedundantElseMatcher";
import { RemoveRedundantElseTransformation } from "./RemoveRedundantElseTransformation";

export default class RemoveRedundantElseCodeAssist extends CodeAssistType<RemoveRedundantElseMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new RemoverRedundantElseMatcher(), [
      new RemoveRedundantElseTransformation(),
    ]);
  }
}
