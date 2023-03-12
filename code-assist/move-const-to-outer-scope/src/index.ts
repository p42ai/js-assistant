
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MoveConstToOuterScopeMatch } from "./MoveConstToOuterScopeMatch";
import { MoveConstToOuterScopeMatcher } from "./MoveConstToOuterScopeMatcher";
import { MoveConstToOuterScopeTransformation } from "./MoveConstToOuterScopeTransformation";

export default class MoveConstToOuterScopeCodeAssist extends CodeAssistType<MoveConstToOuterScopeMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new MoveConstToOuterScopeMatcher(), [
      new MoveConstToOuterScopeTransformation(),
    ]);
  }
}
