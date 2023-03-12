
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { MoveIfElseIfBranchesMatch } from "./MoveIfElseIfBranchesMatch";

export class MoveIfElseIfBranchesUpTransformation extends Transformation<MoveIfElseIfBranchesMatch> {
  isApplicable(match: MoveIfElseIfBranchesMatch): boolean {
    return match.context.selectedRange != null
      ? match.elseIfHeadRange.containsPosition(
          match.context.selectedRange.start
        )
      : false;
  }

  async apply(match: MoveIfElseIfBranchesMatch, tree: TransformedNodeTree) {
    const ifStatement = match.node;
    const elseIfStatement = match.captures.elseIf;

    const newElseIfStatement = tree.updateIfStatement(ifStatement, {
      elseStatement: elseIfStatement.elseStatement ?? null,
    });

    const newIfStatement = tree.updateIfStatement(elseIfStatement, {
      elseStatement: newElseIfStatement,
    });

    tree.replace(ifStatement, newIfStatement);

    return EditorOperation.compose(
      EditorOperation.keepExistingSelection(
        tree,
        elseIfStatement,
        newIfStatement,
        match.context,
        true
      ),
      EditorOperation.highlightNodes(
        tree,
        newIfStatement.expression,
        newIfStatement.thenStatement
      )
    );
  }

  analyzeSafety(match: MoveIfElseIfBranchesMatch): Safety {
    const messages = new SafetyMessageList();
    messages.warning("changes condition evaluation order");
    return messages.produceUnknown();
  }

  getBlockedZones(match: MoveIfElseIfBranchesMatch) {
    const parent = match.node.parent;
    return !ts.isIfStatement(parent)
      ? [
          {
            range: NodeRange.node(match.node.expression),
            codeActionKindIndex: 0,
          },
        ]
      : null;
  }

  getActionZones(
    match: MoveIfElseIfBranchesMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return [
      ...createActionZones(
        "Move if-else branch up",
        [
          {
            range: NodeRange.node(match.captures.elseIf.expression),
            level: CodeAssistLevel.Regular,
          },
        ],
        0 // up
      ),
    ];
  }
}
