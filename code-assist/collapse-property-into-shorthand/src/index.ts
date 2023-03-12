
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { CollapsePropertyIntoShorthandCandidate } from "./CollapsePropertyIntoShorthandCandidate";
import { CollapsePropertyIntoShorthandMatcher } from "./CollapsePropertyIntoShorthandMatcher";
import { CollapsePropertyIntoShorthandTransformation } from "./CollapsePropertyIntoShorthandTransformation";

export default class CollapsePropertyIntoShorthandCodeAssist extends CodeAssistType<CollapsePropertyIntoShorthandCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new CollapsePropertyIntoShorthandMatcher(),
      [new CollapsePropertyIntoShorthandTransformation()]
    );
  }
}
