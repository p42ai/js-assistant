
import {
  ActionZone,
  createActionZones,
  factory,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { ReplaceLodashNoopWithArrowFunctionCandidate } from "./ReplaceLodashNoopWithArrowFunctionCandidate";

export class ReplaceLodashNoopWithArrowFunctionTransformation extends Transformation<ReplaceLodashNoopWithArrowFunctionCandidate> {
  async apply(
    match: ReplaceLodashNoopWithArrowFunctionCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node,
      tree.createArrowFunction({
        parameters: [],
        body: factory.createUndefined(tree, match.context.getScope(match.node)),
      })
    );
  }

  analyzeSafety(match: ReplaceLodashNoopWithArrowFunctionCandidate): Safety {
    return Safety.unknown();
  }

  getActionZones(
    match: ReplaceLodashNoopWithArrowFunctionCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      // TODO show void 0 here if undefined is redefined in scope
      "Replace with () => undefined",
      [
        {
          range: NodeRange.node(match.node),
        },
      ]
    );
  }
}
