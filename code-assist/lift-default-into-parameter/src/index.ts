
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { LiftDefaultIntoParameterCandidate } from "./LiftDefaultIntoParameterCandidate";
import { LiftDefaultIntoParameterMatcher } from "./LiftDefaultIntoParameterMatcher";
import { LiftDefaultIntoParameterTransformation } from "./LiftDefaultIntoParameterTransformation";

export default class LiftDefaultIntoParameterCodeAssist extends CodeAssistType<LiftDefaultIntoParameterCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new LiftDefaultIntoParameterMatcher(),
      [new LiftDefaultIntoParameterTransformation()]
    );
  }

  // match on function level to enable quick-fix availability on the assignment:
  getCandidateChildren(node: ts.Node) {
    if (ts.isFunctionLike(node)) {
      return node.parameters;
    }
  }
}
