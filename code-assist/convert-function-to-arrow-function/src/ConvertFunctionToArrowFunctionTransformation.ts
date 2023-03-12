
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Range,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertFunctionToArrowFunctionCandidate } from "./ConvertFunctionToArrowFunctionCandidate";

export class ConvertFunctionToArrowFunctionTransformation extends Transformation<ConvertFunctionToArrowFunctionCandidate> {
  async apply(
    match: ConvertFunctionToArrowFunctionCandidate,
    tree: TransformedNodeTree
  ) {
    // when callExpression for .bind was matched, replace it to remove ".bind(this)",
    // so matchedExpression and functionExpression are different
    const { functionExpression } = match.captures;

    tree.replace(
      match.node,
      tree.createArrowFunction({
        parameters: functionExpression.parameters.slice(),
        typeParameters: functionExpression.typeParameters?.slice(),
        type: functionExpression.type,
        body: match.captures.return ?? match.captures.content,
      })
    );
  }

  analyzeSafety(match: ConvertFunctionToArrowFunctionCandidate): Safety {
    // TODO can break in new calls etc.
    // it does not make sense to inform until safe/unsafe is available
    return Safety.unknown();
  }

  getSuggestion(
    match: ConvertFunctionToArrowFunctionCandidate,
    safety: Safety
  ): Suggestion | null {
    // don't recommend if conversion to object method is possible:
    if (ts.isPropertyAssignment(match.node.parent)) {
      return null;
    }

    const highlightRanges = [
      new Range(
        match.node.getStart(),
        match.captures.functionExpression.body.getStart() - 1
      ),
    ];

    if (ts.isCallExpression(match.node)) {
      const accessExpression = match.node
        .expression as ts.PropertyAccessExpression;

      highlightRanges.push(
        new Range(
          accessExpression.name.getStart() - 1, // -1 for dot
          match.node.end
        )
      );
    }

    return {
      description:
        "You can convert the function expression into an arrow function.",
      shortActionLabel: "Convert",
      highlightRanges,
    };
  }

  getActionZones(
    match: ConvertFunctionToArrowFunctionCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to arrow function", [
      {
        range: NodeRange.functionLabel(match.captures.functionExpression),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
