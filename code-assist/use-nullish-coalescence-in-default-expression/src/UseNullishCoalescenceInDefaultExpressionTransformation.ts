
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  isSideEffectFree,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { UseNullishCoalescenceInDefaultExpressionCandidate } from "./UseNullishCoalescenceInDefaultExpressionCandidate";

export class UseNullishCoalescenceInDefaultExpressionTransformation extends Transformation<UseNullishCoalescenceInDefaultExpressionCandidate> {
  async apply(
    match: UseNullishCoalescenceInDefaultExpressionCandidate,
    tree: TransformedNodeTree
  ) {
    const { variableName } = match.captures;

    const nullishExpression = tree.createBinaryExpression({
      left: match.captures.checkedExpression,
      operator: ts.SyntaxKind.QuestionQuestionToken,
      right: match.captures.default,
    });

    // if variable name was captured, it was a conditional assignment expression
    tree.replace(
      match.node,
      variableName != null
        ? tree.createExpressionStatement({
            expression: tree.createBinaryExpression({
              left: tree.createIdentifier({ text: variableName }),
              operator: ts.SyntaxKind.EqualsToken,
              right: nullishExpression,
            }),
          })
        : nullishExpression
    );
  }

  analyzeSafety(
    match: UseNullishCoalescenceInDefaultExpressionCandidate
  ): Safety {
    return isSideEffectFree(match.captures.checkedExpression, match.context)
      ? Safety.safe()
      : Safety.warning("could change number of function or getter calls");
  }

  getSuggestion(
    match: UseNullishCoalescenceInDefaultExpressionCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description:
        "You can shorten the default value assignment with the nullish coalescing operator (??).",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: UseNullishCoalescenceInDefaultExpressionCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert into ?? default assignment", [
      {
        range: ts.isIfStatement(match.node)
          ? NodeRange.ifStatementIfKeyword(match.node)
          : NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
