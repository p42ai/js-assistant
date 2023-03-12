
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  isBlockLike,
  isConstantExpression,
  isSideEffectFree,
  NodeRange,
  PrefixTriviaMove,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { MoveFirstStatementOutOfIfElseCandidate } from "./MoveFirstStatementOutOfIfElseCandidate";

export class MoveFirstStatementOutOfIfElseTransformation extends Transformation<MoveFirstStatementOutOfIfElseCandidate> {
  async apply(
    match: MoveFirstStatementOutOfIfElseCandidate,
    tree: TransformedNodeTree
  ) {
    const ifStatement = match.node;
    const movedStatement = match.captures.elseOccurrence;

    const removeFirstStatement = (blockOrStatement: ts.Statement) =>
      ts.isBlock(blockOrStatement)
        ? tree.updateBlock(blockOrStatement, {
            statements: blockOrStatement.statements.slice(
              1,
              blockOrStatement.statements.length
            ),
          })
        : tree.createBlock({ statements: [] });

    const updatedIfStatement = tree.updateIfStatement(ifStatement, {
      thenStatement: removeFirstStatement(ifStatement.thenStatement),
      elseStatement: removeFirstStatement(ifStatement.elseStatement!),
    });

    if (isBlockLike(ifStatement.parent)) {
      tree.replace(ifStatement, updatedIfStatement);
      tree.insertStatement(
        ifStatement.parent,
        movedStatement,
        ifStatement.parent.statements.indexOf(ifStatement)
      );
    } else {
      tree.replace(
        ifStatement,
        tree.createBlock({
          statements: [movedStatement, updatedIfStatement],
        })
      );
    }

    tree.updateTrivia(new PrefixTriviaMove(ifStatement, movedStatement));
  }

  analyzeSafety({
    context,
    node: ifStatement,
    captures: { elseOccurrence: movedNode },
  }: MoveFirstStatementOutOfIfElseCandidate): Safety {
    const safetyMessages = new SafetyMessageList();

    const isConditionSideEffectFree = isSideEffectFree(
      ifStatement.expression,
      context
    );

    if (
      ts.isVariableStatement(movedNode) &&
      movedNode.declarationList.declarations.length === 1
    ) {
      const declaration = movedNode.declarationList.declarations[0];
      if (
        ts.isIdentifier(declaration.name) &&
        (declaration.initializer == null ||
          isConstantExpression(declaration.initializer, context) ||
          (isConditionSideEffectFree &&
            isSideEffectFree(declaration.initializer, context)))
      ) {
        const variableName = declaration.name.text;
        const ifStatementScope = context.getScope(ifStatement);

        if (ifStatementScope.hasBinding(variableName)) {
          safetyMessages.error("variable name is already used in outer scope");
        }

        return safetyMessages.produceSafe();
      }
    }

    safetyMessages.warning("could affect if-statement condition");

    if (!isConditionSideEffectFree) {
      safetyMessages.warning("if-condition can have side-effects");
    }

    return safetyMessages.produceSafe();
  }

  getSuggestion(
    match: MoveFirstStatementOutOfIfElseCandidate,
    safety: Safety
  ): Suggestion | null {
    if (!safety.isSafe()) {
      return null;
    }

    return {
      description:
        "You can move the duplicated first statement above the if-else statement.",
      shortActionLabel: "Move",
      highlightRanges: [
        NodeRange.node(match.captures.thenOccurrence),
        NodeRange.node(match.captures.elseOccurrence),
      ],
    };
  }

  getActionZones(
    match: MoveFirstStatementOutOfIfElseCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    // TODO if there is only 1 statement in both if and else, only show in
    // refactoring menu, but not in quick-fix menu, because it collides with
    // the preferred removal of the whole if-statement (move-last)
    const isSingleThenStatement =
      !ts.isBlock(match.node.thenStatement) ||
      match.node.thenStatement.statements.length === 1;
    const isSingleElseStatement =
      !ts.isBlock(match.node.elseStatement!) ||
      match.node.elseStatement.statements.length === 1;
    const isSingleStatementInEachBranch =
      isSingleThenStatement && isSingleElseStatement;

    const level = CodeAssistLevel.getSuggestionOrQuickFix(
      !isSingleStatementInEachBranch && isSuggestion
    );

    return createActionZones("Move above if-else", [
      {
        range: NodeRange.node(match.captures.thenOccurrence),
        level,
      },
      {
        range: NodeRange.node(match.captures.elseOccurrence),
        level,
      },
    ]);
  }
}
