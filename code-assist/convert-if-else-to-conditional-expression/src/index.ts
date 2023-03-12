import { CodeAssistMetadata, CodeAssistType, isBlockLike } from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { ConvertIfElseToConditionalExpressionMatch } from "./ConvertIfElseToConditionalExpressionMatch";
import { ConvertIfElseToConditionalExpressionMatcher } from "./ConvertIfElseToConditionalExpressionMatcher";
import { ConvertIfElseToConditionalExpressionTransformation } from "./ConvertIfElseToConditionalExpressionTransformation";

export default class ConvertIfElseToConditionalExpressionCodeAssist extends CodeAssistType<ConvertIfElseToConditionalExpressionMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertIfElseToConditionalExpressionMatcher(),
      [new ConvertIfElseToConditionalExpressionTransformation()]
    );
  }

  getCandidateChildren(node: ts.Node) {
    // search in parent block to enable action zones on variable statement
    // for the "declaration-if-assignment" case:
    if (isBlockLike(node)) {
      return node.statements.filter(ts.isIfStatement);
    }
  }
}
