
import {
  ActionZone,
  createActionZones,
  isConstDeclarationList,
  NodeRange,
  Range,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { SplitVariableDeclarationAndInitializationCandidate } from "./SplitVariableDeclarationAndInitializationCandidate";

export class SplitVariableDeclarationAndInitializationTransformation extends Transformation<SplitVariableDeclarationAndInitializationCandidate> {
  async apply(
    match: SplitVariableDeclarationAndInitializationCandidate,
    tree: TransformedNodeTree
  ) {
    const { block, declarationList } = match.captures;

    // change variable type from const to let
    if (isConstDeclarationList(declarationList)) {
      tree.replace(
        declarationList,
        tree.updateVariableDeclarationList(declarationList, {
          flags: ts.NodeFlags.Let,
        })
      );
    }

    // clear initializer
    tree.replace(
      match.node,
      tree.updateVariableDeclaration(match.node, {
        initializer: null,
      })
    );

    // insert statement in surrounding block
    const assignmentStatement = tree.createExpressionStatement({
      expression: tree.createBinaryExpression({
        left: tree.createIdentifier({
          text: match.captures.name,
        }),
        operator: ts.SyntaxKind.EqualsToken,
        right: match.captures.initializer,
      }),
    });

    tree.insertStatement(block, assignmentStatement, match.data.insertionIndex);

    // transfer whitespace to new expression statement
    tree.updateTriviaWhenInsertingStatementAfter(
      declarationList.parent,
      assignmentStatement
    );
  }

  analyzeSafety(
    match: SplitVariableDeclarationAndInitializationCandidate
  ): Safety {
    if (
      match.context.scriptMetadata.isTypeScript() &&
      match.node.type == null
    ) {
      return Safety.warning("no type annotation");
    }

    return Safety.safe();
  }

  getActionZones(
    match: SplitVariableDeclarationAndInitializationCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Split declaration and initialization", [
      {
        range: new Range(
          match.node.pos,
          NodeRange.firstCharactersOfNode(match.captures.initializer, 3).end
        ),
      },
    ]);
  }
}
