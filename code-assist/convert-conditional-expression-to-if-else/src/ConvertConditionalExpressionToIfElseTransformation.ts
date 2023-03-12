
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertConditionalExpressionToIfElseCandidate } from "./ConvertConditionalExpressionToIfElseCandidate";

export class ConvertConditionalExpressionToIfElseTransformation extends Transformation<ConvertConditionalExpressionToIfElseCandidate> {
  async apply(
    match: ConvertConditionalExpressionToIfElseCandidate,
    tree: TransformedNodeTree
  ) {
    const conditional = match.captures.conditionalExpression;

    switch (match.captures.type) {
      case "return": {
        replaceNode(
          tree,
          match,
          tree.createReturnStatement({
            expression: conditional.whenTrue,
          }),
          tree.createReturnStatement({
            expression: conditional.whenFalse,
          })
        );
        return;
      }
      case "assignment": {
        const assignment = match.captures.assignmentExpression;

        replaceNode(
          tree,
          match,
          tree.createExpressionStatement({
            expression: tree.createBinaryExpression({
              left: assignment.left,
              operator: assignment.operatorToken.kind,
              right: conditional.whenTrue,
            }),
          }),
          tree.createExpressionStatement({
            expression: tree.createBinaryExpression({
              left: assignment.left,
              operator: assignment.operatorToken.kind,
              right: conditional.whenFalse,
            }),
          })
        );
        return;
      }
      case "expression": {
        replaceNode(
          tree,
          match,
          tree.createExpressionStatement({
            expression: conditional.whenTrue,
          }),
          tree.createExpressionStatement({
            expression: conditional.whenFalse,
          })
        );
        return;
      }
    }
  }

  analyzeSafety(match: ConvertConditionalExpressionToIfElseCandidate): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: ConvertConditionalExpressionToIfElseCandidate,
    safety: Safety
  ): Suggestion | null {
    if (match.captures.type !== "expression") {
      return null;
    }

    return {
      description: `You can convert the conditional ${match.captures.type} statement into an if-else statement.`,
      shortActionLabel: "Convert",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ConvertConditionalExpressionToIfElseCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert into if-else", [
      {
        range: NodeRange.node(
          match.captures.conditionalExpression.questionToken
        ),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}

function replaceNode(
  tree: TransformedNodeTree,
  match: ConvertConditionalExpressionToIfElseCandidate,
  trueStatement: ts.Statement,
  falseStatement: ts.Statement
) {
  tree.replace(
    match.node,
    tree.createIfStatement({
      expression: match.captures.conditionalExpression.condition,
      thenStatement: tree.createBlock({
        statements: [trueStatement],
      }),
      elseStatement: tree.createBlock({
        statements: [falseStatement],
      }),
    })
  );
}
