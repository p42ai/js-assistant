
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
import { ReplaceLodashForeachCandidate } from "./ReplaceLodashForeachCandidate";

export class ReplaceLodashForeachWithArrayForEachTransformation extends Transformation<ReplaceLodashForeachCandidate> {
  isApplicable(match: ReplaceLodashForeachCandidate): boolean {
    const collectionType = match.data.collectionKind;
    return collectionType === "array" || collectionType === "unknown";
  }

  async apply(match: ReplaceLodashForeachCandidate, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.updateCallExpression(match.node, {
        expression: this.createPropertyAccess(match, tree),
        argumentsArray: match.node.arguments.slice(1),
      })
    );
  }

  private createPropertyAccess(
    match: ReplaceLodashForeachCandidate,
    tree: TransformedNodeTree
  ): ts.Expression | undefined {
    const access = {
      expression: match.captures.collection,
      name: tree.createIdentifier({
        text: "forEach",
      }),
    };

    return match.data.collectionCanBeNull
      ? tree.createPropertyAccessChain(access)
      : tree.updatePropertyAccessExpression(
          match.node.expression as ts.PropertyAccessExpression,
          access
        );
  }

  analyzeSafety(match: ReplaceLodashForeachCandidate): Safety {
    const collectionType = match.data.collectionKind!;

    if (collectionType === "array") {
      return Safety.safe();
    }

    if (collectionType === "unknown") {
      return Safety.warning("only use for arrays");
    }

    return Safety.unknown();
  }

  getSuggestion(
    match: ReplaceLodashForeachCandidate,
    safety: Safety
  ): Suggestion | null {
    if (!safety.isSafe()) {
      return null;
    }

    return {
      description: `You can replace _.${match.captures.lodashCall.captures.name} (Lodash) with Array.forEach.`,
      shortActionLabel: "Replace",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ReplaceLodashForeachCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Replace with Array.forEach", [
      {
        range: NodeRange.node(match.node.expression),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
