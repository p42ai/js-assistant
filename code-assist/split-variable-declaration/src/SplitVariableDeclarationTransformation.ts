
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  PrefixToSuffixTriviaMove,
  PrefixTriviaMove,
  Safety,
  SuffixTriviaMove,
  Suggestion,
  TrailingSeparatorTriviaMove,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { SplitVariableDeclarationCandidate } from "./SplitVariableDeclarationCandidate";

export class SplitVariableDeclarationTransformation extends Transformation<SplitVariableDeclarationCandidate> {
  async apply(
    match: SplitVariableDeclarationCandidate,
    tree: TransformedNodeTree
  ) {
    const { declarationList } = match.node;

    const newVariableDeclarationStatements = declarationList.declarations.map(
      (declaration) =>
        tree.createVariableStatement({
          modifiers: match.node.modifiers?.slice(),
          declarationList: tree.createVariableDeclarationList({
            declarations: [declaration],
            flags: declarationList.flags,
          }),
        })
    );

    tree.replaceStatementWithMany(match.node, newVariableDeclarationStatements);

    // move comments and whitespace
    tree.updateTrivia(
      new PrefixTriviaMove(match.node, newVariableDeclarationStatements[0])
    );

    for (let i = 0; i < newVariableDeclarationStatements.length - 1; i++) {
      const declaration = newVariableDeclarationStatements[i];
      const nextDeclaration = newVariableDeclarationStatements[i + 1];

      tree.updateTrivia(
        new PrefixToSuffixTriviaMove(
          nextDeclaration.declarationList.declarations[0],
          declaration
        )
      );
      tree.updateTrivia(
        new TrailingSeparatorTriviaMove(
          declaration.declarationList.declarations[0],
          declaration
        )
      );
    }

    tree.updateTrivia(
      new SuffixTriviaMove(
        match.node,
        newVariableDeclarationStatements[
          newVariableDeclarationStatements.length - 1
        ]
      )
    );
  }

  analyzeSafety(match: SplitVariableDeclarationCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: SplitVariableDeclarationCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description:
        "You can split a combined variable declaration into separate declarations.",
      shortActionLabel: "Split",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: SplitVariableDeclarationCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Split into separate declarations", [
      {
        range: NodeRange.variableDeclarationList(match.node.declarationList),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
