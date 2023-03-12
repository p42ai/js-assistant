
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  getSyntaxKindLabel,
  isSideEffectFree,
  NodeRange,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertToOptionalChainingMatch } from "./ConvertToOptionalChainingMatch";

export class ConvertToOptionalChainingTransformation extends Transformation<ConvertToOptionalChainingMatch> {
  async apply(
    match: ConvertToOptionalChainingMatch,
    tree: TransformedNodeTree
  ) {
    const { mainExpression, finalExpression, finalExpressionReplacementPart } =
      match.captures;

    let replacement;

    if (ts.isPropertyAccessExpression(finalExpressionReplacementPart)) {
      replacement = tree.createPropertyAccessChain({
        expression: mainExpression,
        name: match.captures.finalMemberAccess as ts.MemberName,
      });
    } else if (ts.isElementAccessExpression(finalExpressionReplacementPart)) {
      replacement = tree.createElementAccessChain({
        expression: mainExpression,
        argumentExpression: match.captures.finalMemberAccess,
      });
    } else if (ts.isCallExpression(finalExpressionReplacementPart)) {
      replacement = tree.createCallChain({
        expression: mainExpression,
        argumentsArray: finalExpressionReplacementPart.arguments.slice(),
      });
    } else {
      throw new Error(
        `invalid type ${getSyntaxKindLabel(finalExpressionReplacementPart)}`
      );
    }

    if (finalExpression === finalExpressionReplacementPart) {
      tree.replace(match.node, replacement);
    } else {
      tree.replace(match.node, finalExpression);
      tree.replace(finalExpressionReplacementPart, replacement);
    }
  }

  analyzeSafety(match: ConvertToOptionalChainingMatch): Safety {
    const messages = new SafetyMessageList();

    messages.warning("changes result for falsy values");

    if (!isSideEffectFree(match.captures.mainExpression, match.context)) {
      messages.warning("can change number of calls with side-effects");
    }

    return messages.produceUnknown();
  }

  getSuggestion(
    match: ConvertToOptionalChainingMatch,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can replace \`${match.node.getText()}\` with optional chaining.`,
      shortActionLabel: "Replace",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ConvertToOptionalChainingMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to optional chaining", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
