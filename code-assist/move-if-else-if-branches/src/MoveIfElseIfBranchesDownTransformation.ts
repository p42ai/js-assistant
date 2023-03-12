
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

export class MoveIfElseIfBranchesDownTransformation extends Transformation<MoveIfElseIfBranchesMatch> {
  isApplicable(match: MoveIfElseIfBranchesMatch): boolean {
    return match.context.selectedRange != null
      ? match.ifRange.containsPosition(match.context.selectedRange.start)
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
        ifStatement,
        newElseIfStatement,
        match.context,
        true
      ),
      EditorOperation.highlightNodes(
        tree,
        newElseIfStatement.expression,
        newElseIfStatement.thenStatement
      )
    );
  }

  analyzeSafety(match: MoveIfElseIfBranchesMatch): Safety {
    const messages = new SafetyMessageList();
    messages.warning("changes condition evaluation order");
    return messages.produceUnknown();
  }

  getBlockedZones(match: MoveIfElseIfBranchesMatch) {
    const nextElse = match.captures.elseIf.elseStatement;
    return nextElse == null || !ts.isIfStatement(nextElse)
      ? [
          {
            range: NodeRange.node(match.captures.elseIf.expression),
            codeActionKindIndex: 1,
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
        "Move if-else branch down",
        [
          {
            range: NodeRange.node(match.node.expression),
            level: CodeAssistLevel.Regular,
          },
        ],
        1 // down
      ),
    ];
  }
}
