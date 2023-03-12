
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { FlattenArrayRestPropertyMatch } from "./FlattenArrayRestPropertyMatch";
import { FlattenArrayRestPropertyMatcher } from "./FlattenArrayRestPropertyMatcher";
import { FlattenArrayRestPropertyTransformation } from "./FlattenArrayRestPropertyTransformation";

export default class FlattenArrayRestPropertyCodeAssist extends CodeAssistType<FlattenArrayRestPropertyMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new FlattenArrayRestPropertyMatcher(),
      [new FlattenArrayRestPropertyTransformation()]
    );
  }
}
