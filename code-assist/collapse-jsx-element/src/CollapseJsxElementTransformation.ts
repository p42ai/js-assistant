
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
import { CollapseJsxElementCandidate } from "./CollapseJsxElementCandidate";

export class CollapseJsxElementTransformation extends Transformation<CollapseJsxElementCandidate> {
  async apply(match: CollapseJsxElementCandidate, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.createJsxSelfClosingElement({
        tagName: match.node.openingElement.tagName,
        attributes: match.node.openingElement.attributes,
        typeArguments: match.node.openingElement.typeArguments?.slice(0),
      })
    );
  }

  analyzeSafety(match: CollapseJsxElementCandidate): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: CollapseJsxElementCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can collapse the empty JSX tag into a self-closing tag.`,
      highlightRanges: [NodeRange.node(match.node)],
      shortActionLabel: "Collapse",
    };
  }

  getActionZones(
    match: CollapseJsxElementCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Collapse tag", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
