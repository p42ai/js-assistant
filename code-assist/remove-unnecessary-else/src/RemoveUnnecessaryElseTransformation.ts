
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  IfStatement,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import * as _ from "lodash";
import ts from "typescript";
import { RemoveUnnecessaryElseCandidate } from "./RemoveUnnecessaryElseCandidate";

export class RemoveUnnecessaryElseTransformation extends Transformation<RemoveUnnecessaryElseCandidate> {
  async apply(
    match: RemoveUnnecessaryElseCandidate,
    tree: TransformedNodeTree
  ) {
    const ifStatement = match.node;

    let { thenStatement } = ifStatement;

    // introduce a guard clause return when there is none
    if (match.captures.thenWithoutReturn) {
      if (ts.isBlock(thenStatement)) {
        tree.appendStatements(thenStatement, tree.createReturnStatement({}));
      } else {
        thenStatement = tree.createBlock({
          statements: [thenStatement, tree.createReturnStatement({})],
        });
      }
    }

    tree.replace(
      ifStatement,
      tree.updateIfStatement(ifStatement, {
        thenStatement,
        elseStatement: null,
      })
    );

    tree.insertStatementsAfter(
      ifStatement,
      ...IfStatement.getElseStatements(ifStatement)
    );
  }

  analyzeSafety(match: RemoveUnnecessaryElseCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: RemoveUnnecessaryElseCandidate,
    safety: Safety
  ): Suggestion | null {
    if (!this.isSuggestion(match)) {
      return null;
    }

    return {
      description: "You can remove the unnecessary else.",
      shortActionLabel: "Remove",
      highlightRanges: [NodeRange.ifStatementElseKeyword(match.node)],
    };
  }

  private isSuggestion(match: RemoveUnnecessaryElseCandidate) {
    const ifStatement = match.node;
    const elseStatement = ifStatement.elseStatement!;
    const thenHasReturn = !match.captures.thenWithoutReturn;

    // for else-if, don't suggest (user style):
    if (ts.isIfStatement(elseStatement)) {
      return false;
    }

    // else-statement needs to be a block
    if (!ts.isBlock(elseStatement)) {
      return false;
    }

    const { statements } = elseStatement;

    // suggest for longer else statements
    if (statements.length > 2) {
      return true;
    }

    // suggest when else has no return, but if does
    const lastStatement = _.last(statements);
    return (
      thenHasReturn &&
      (lastStatement == null || !ts.isReturnStatement(lastStatement))
    );
  }

  getActionZones(
    match: RemoveUnnecessaryElseCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Remove unnecessary else", [
      // on else keyword: highlight
      {
        range: NodeRange.ifStatementElseKeyword(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      // on else block: quick-fix
      {
        range: NodeRange.node(match.node.elseStatement!),
        level: CodeAssistLevel.PreferredQuickFix,
      },
      // on whole if-statement: in refactor context menu
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.Regular,
      },
    ]);
  }
}
