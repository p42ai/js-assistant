
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { SurroundWithJsxFragmentCandidate } from "./SurroundWithJsxFragmentCandidate";

export class SurroundWithJsxFragmentTransformation extends Transformation<SurroundWithJsxFragmentCandidate> {
  async apply(
    match: SurroundWithJsxFragmentCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(match.node, this.createFragmentWithContent(match, tree));
  }

  private createFragmentWithContent(
    match: SurroundWithJsxFragmentCandidate,
    tree: TransformedNodeTree
  ) {
    switch (match.captures.type) {
      case "single": {
        return tree.createJsxFragmentWithContent([match.node]);
      }

      case "multiple": {
        const matchNode = match.node as ts.JsxFragment | ts.JsxElement;

        const fragment = tree.createJsxFragmentWithContent(
          match.captures.selectedChildren
        );

        const { selectedChildren } = match.captures;
        const matchChildren = matchNode.children;
        const newChildren = matchChildren.slice();
        newChildren.splice(
          matchChildren.indexOf(selectedChildren[0]),
          selectedChildren.length,
          fragment
        );

        return ts.isJsxElement(matchNode)
          ? tree.updateJsxElement(matchNode, {
              children: newChildren,
            })
          : tree.updateJsxFragment(matchNode, {
              children: newChildren,
            });
      }
    }
  }

  analyzeSafety(match: SurroundWithJsxFragmentCandidate) {
    return Safety.safe();
  }

  getActionZones(
    match: SurroundWithJsxFragmentCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Surround with <>...</>", [
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}
