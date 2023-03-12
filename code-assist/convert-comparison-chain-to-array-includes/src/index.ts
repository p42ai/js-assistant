
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertComparisonChainToArrayIncludesCandidate } from "./ConvertComparisonChainToArrayIncludesCandidate";
import { ConvertComparisonChainToArrayIncludesMatcher } from "./ConvertComparisonChainToArrayIncludesMatcher";
import { ConvertComparisonChainToArrayIncludesTransformation } from "./ConvertComparisonChainToArrayIncludesTransformation";

export default class ConvertOrEqualChainToArrayIncludesCodeAssist extends CodeAssistType<ConvertComparisonChainToArrayIncludesCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertComparisonChainToArrayIncludesMatcher(),
      [new ConvertComparisonChainToArrayIncludesTransformation()]
    );
  }
}
