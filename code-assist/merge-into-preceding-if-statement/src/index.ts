
import {
  CodeAssistMetadata,
  CodeAssistType,
} from "@p42/engine";
import { MergeIntoPrecedingIfStatementMatch } from "./MergeIntoPrecedingIfStatementMatch";
import { MergeIntoPrecedingIfStatementMatcher } from "./MergeIntoPrecedingIfStatementMatcher";
import { MergeIntoPrecedingIfStatementTransformation } from "./MergeIntoPrecedingIfStatementTransformation";
import metadata from "./code-assist.json";

export default class MergeIntoPrecedingIfStatementCodeAssist extends CodeAssistType<MergeIntoPrecedingIfStatementMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MergeIntoPrecedingIfStatementMatcher(),
      [new MergeIntoPrecedingIfStatementTransformation()]
    );
  }
}
