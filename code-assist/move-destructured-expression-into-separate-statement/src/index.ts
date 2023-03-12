
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MoveDestructuredExpressionIntoSeparateStatementMatch } from "./MoveDestructuredExpressionIntoSeparateStatementMatch";
import { MoveDestructuredExpressionIntoSeparateStatementMatcher } from "./MoveDestructuredExpressionIntoSeparateStatementMatcher";
import { MoveDestructuredExpressionIntoSeparateStatementTransformation } from "./MoveDestructuredExpressionIntoSeparateStatementTransformation";

export default class MoveDestructuredExpressionIntoSeparateStatementCodeAssist extends CodeAssistType<MoveDestructuredExpressionIntoSeparateStatementMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveDestructuredExpressionIntoSeparateStatementMatcher(),
      [new MoveDestructuredExpressionIntoSeparateStatementTransformation()]
    );
  }
}
