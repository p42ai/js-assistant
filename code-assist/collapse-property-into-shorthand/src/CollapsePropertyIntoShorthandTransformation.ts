
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
import { CollapsePropertyIntoShorthandCandidate } from "./CollapsePropertyIntoShorthandCandidate";

export class CollapsePropertyIntoShorthandTransformation extends Transformation<CollapsePropertyIntoShorthandCandidate> {
  async apply(
    match: CollapsePropertyIntoShorthandCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node,
      ts.isPropertyAssignment(match.node)
        ? tree.createShorthandPropertyAssignment({
            name: match.node.name as ts.Identifier,
          })
        : tree.updateBindingElement(match.node, {
            propertyName: null,
          })
    );
  }

  analyzeSafety(match: CollapsePropertyIntoShorthandCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: CollapsePropertyIntoShorthandCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can collapse '${match.captures.identifierName}: ${match.captures.identifierName}' into a shorthand property name.`,
      highlightRanges: [NodeRange.node(match.node)],
      shortActionLabel: "Collapse",
    };
  }

  getActionZones(
    match: CollapsePropertyIntoShorthandCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Collapse into shorthand", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
