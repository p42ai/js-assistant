
import {
  CodeAssistMetadata,
  CodeAssistType,
} from "@p42/engine";
import { InlineVariableOccurrenceMatch } from "./InlineVariableOccurrenceMatch";
import { InlineVariableOccurrenceMatcher } from "./InlineVariableOccurrenceMatcher";
import { InlineVariableOccurrenceTransformation } from "./InlineVariableOccurrenceTransformation";
import metadata from "./code-assist.json";

export default class InlineVariableOccurrenceCodeAssist extends CodeAssistType<InlineVariableOccurrenceMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new InlineVariableOccurrenceMatcher(),
      [new InlineVariableOccurrenceTransformation()]
    );
  }
}
