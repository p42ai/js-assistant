
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
import { LiftDefaultIntoParameterCandidate } from "./LiftDefaultIntoParameterCandidate";

export class LiftDefaultIntoParameterTransformation extends Transformation<LiftDefaultIntoParameterCandidate> {
  async apply(
    match: LiftDefaultIntoParameterCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node,
      tree.updateParameterDeclaration(match.node, {
        questionToken: null, // remove question token (since default is provided)
        initializer: match.captures.defaultExpression,
      })
    );

    tree.remove(match.captures.defaultExpressionStatement);
  }

  analyzeSafety(match: LiftDefaultIntoParameterCandidate): Safety {
    switch (match.captures.type) {
      case "nullish":
        return Safety.warning("changes behavior for null");
      case "falsy":
        return Safety.warning("changes behavior for falsy values");
      case "undefined":
        return Safety.safe();
    }
  }

  getSuggestion(
    match: LiftDefaultIntoParameterCandidate,
    safety: Safety
  ): Suggestion | null {
    const nodeText = match.captures.defaultExpressionStatement.getText();
    const matchedSource = nodeText == null ? "" : `'${nodeText}' `;

    return {
      description: `You can lift the default value ${matchedSource}into the parameter.`,
      shortActionLabel: "Lift",
      highlightRanges: [
        NodeRange.node(match.node),
        NodeRange.node(match.captures.defaultExpressionStatement),
      ],
    };
  }

  getActionZones(
    match: LiftDefaultIntoParameterCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Lift default into parameter", [
      {
        range: NodeRange.node(match.captures.defaultExpressionStatement),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}
