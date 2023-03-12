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
import { MergeVariableDeclarationAndInitializationCandidate } from "./MergeVariableDeclarationAndInitializationCandidate";

export class MergeVariableDeclarationAndInitializationTransformation extends Transformation<MergeVariableDeclarationAndInitializationCandidate> {
  async apply(
    match: MergeVariableDeclarationAndInitializationCandidate,
    tree: TransformedNodeTree
  ) {
    tree.remove(match.captures.assignmentExpression);
    tree.replace(
      match.node,
      tree.updateVariableDeclaration(match.node, {
        initializer: match.captures.initializer,
      })
    );
  }

  analyzeSafety(
    match: MergeVariableDeclarationAndInitializationCandidate
  ): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: MergeVariableDeclarationAndInitializationCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can merge the initial assignment into the declaration of '${match.captures.variableName}'.`,
      shortActionLabel: "Merge",
      highlightRanges: [
        NodeRange.node(match.node),
        NodeRange.node(match.captures.assignmentExpression.expression),
      ],
    };
  }

  getActionZones(
    match: MergeVariableDeclarationAndInitializationCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    const variableStatement = match.node.parent.parent;
    const assignmentExpression = match.captures.assignmentExpression
      .expression as ts.BinaryExpression;

    return createActionZones("Merge declaration and initialization", [
      {
        range: new Range(variableStatement.getStart(), match.node.getEnd()),
        level: CodeAssistLevel.QuickFix,
      },
      {
        range: new Range(
          assignmentExpression.getStart(),
          assignmentExpression.operatorToken.end
        ),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
