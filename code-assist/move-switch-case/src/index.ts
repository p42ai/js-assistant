
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveSwitchCaseMatch } from "./MoveSwitchCaseMatch";
import { MoveSwitchCaseMatcher } from "./MoveSwitchCaseMatcher";

export default class MoveSwitchCaseCodeAssist extends CodeAssistType<MoveSwitchCaseMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveSwitchCaseMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move case up",
        downActionLabel: "Move case down",
        updateContainer: (
          container: ts.CaseBlock,
          newChildren: Array<ts.CaseOrDefaultClause>,
          tree
        ) =>
          tree.updateCaseBlock(container, {
            clauses: newChildren,
          }),
      })
    );
  }
}
