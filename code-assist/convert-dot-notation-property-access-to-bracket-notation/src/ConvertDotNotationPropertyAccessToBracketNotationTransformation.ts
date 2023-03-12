
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
import { ConvertDotNotationPropertyAccessToBracketNotationCandidate } from "./ConvertDotNotationPropertyAccessToBracketNotationCandidate";

export class ConvertDotNotationPropertyAccessToBracketNotationTransformation extends Transformation<ConvertDotNotationPropertyAccessToBracketNotationCandidate> {
  async apply(
    match: ConvertDotNotationPropertyAccessToBracketNotationCandidate,
    tree: TransformedNodeTree
  ) {
    // TODO extract property access chain creation into factory (also optional chaining)
    const replacement =
      match.node.questionDotToken == null
        ? tree.createElementAccessExpression({
            expression: match.node.expression,
            argumentExpression: tree.createStringLiteral({
              text: match.captures.name,
            }),
          })
        : tree.markNewNode(
            ts.factory.createElementAccessChain(
              tree.markOriginalNode(match.node.expression),
              tree.markNewNode(
                ts.factory.createToken(ts.SyntaxKind.QuestionDotToken)
              ),
              tree.createStringLiteral({
                text: match.captures.name,
              })
            )
          );

    tree.replace(match.node, replacement);
  }

  analyzeSafety(
    match: ConvertDotNotationPropertyAccessToBracketNotationCandidate
  ) {
    return Safety.safe();
  }

  getActionZones(
    match: ConvertDotNotationPropertyAccessToBracketNotationCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to bracket notation", [
      {
        range: NodeRange.node(match.node.name),
        level: CodeAssistLevel.Regular,
      },
    ]);
  }
}
