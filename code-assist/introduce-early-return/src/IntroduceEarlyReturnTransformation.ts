
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  factory,
  IfStatement,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { IntroduceEarlyReturnMatch } from "./IntroduceEarlyReturnMatch";

export class IntroduceEarlyReturnTransformation extends Transformation<IntroduceEarlyReturnMatch> {
  async apply(match: IntroduceEarlyReturnMatch, tree: TransformedNodeTree) {
    const ifStatement = match.node;

    const returnOrContinue =
      match.type === "continue"
        ? tree.createContinueStatement({})
        : tree.createReturnStatement({});

    if (match.hasElseStatement()) {
      let { thenStatement } = ifStatement;

      if (ts.isBlock(thenStatement)) {
        tree.appendStatements(thenStatement, returnOrContinue);
      } else {
        thenStatement = tree.createBlock({
          statements: [thenStatement, returnOrContinue],
        });
      }

      tree.replace(
        match.node,
        tree.updateIfStatement(match.node, {
          thenStatement,
          elseStatement: null,
        })
      );

      tree.insertStatementsAfter(
        ifStatement,
        ...IfStatement.getElseStatements(ifStatement)
      );
      return;
    }

    tree.replace(
      match.node,
      tree.updateIfStatement(match.node, {
        expression: factory.negateExpression(
          match.node.expression,
          tree,
          match.context
        ),
        thenStatement: tree.createBlock({
          statements: [returnOrContinue],
        }),
      })
    );
    tree.insertStatementsAfter(
      ifStatement,
      ...IfStatement.getThenStatements(ifStatement)
    );
  }

  analyzeSafety(match: IntroduceEarlyReturnMatch): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: IntroduceEarlyReturnMatch,
    safety: Safety
  ): Suggestion | null {
    const { thenStatement } = match.node;

    if (
      !ts.isBlock(thenStatement) ||
      match.type === "continue" ||
      ts.isConstructorDeclaration(match.captures.container) ||
      thenStatement.statements.length <= 2
    ) {
      return null;
    }

    return {
      description: `You can introduce an early ${match.type} statement.`,
      highlightRanges: [NodeRange.ifStatementHead(match.node)],
    };
  }

  getActionZones(
    match: IntroduceEarlyReturnMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(`Introduce early ${match.type}`, [
      {
        range: NodeRange.ifStatementHead(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
