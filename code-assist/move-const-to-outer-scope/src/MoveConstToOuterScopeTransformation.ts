
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  NodeRange,
  Safety,
  SafetyMessageList,
  Statement,
  Suggestion,
  Transformation,
  TransformedNodeTree,
  VariableDeclarationKind,
  VariableStatement,
} from "@p42/engine";
import { MoveConstToOuterScopeMatch } from "./MoveConstToOuterScopeMatch";

export class MoveConstToOuterScopeTransformation extends Transformation<MoveConstToOuterScopeMatch> {
  async apply(match: MoveConstToOuterScopeMatch, tree: TransformedNodeTree) {
    tree.remove(match.node);

    // move the full statement (incl. comments) when it only
    // contains a single declaration
    const statement = VariableStatement.isSingleDeclarationStatement(
      match.variableStatement
    )
      ? match.variableStatement
      : tree.createVariableStatement({
          declarationList: tree.createVariableDeclarationList({
            flags: VariableDeclarationKind.Const.flags,
            declarations: [match.node],
          }),
        });

    tree.insertStatementsBefore(
      Statement.getRootStatementAncestor(match.node),
      statement
    );

    return EditorOperation.compose(
      EditorOperation.keepExistingSelection(
        tree,
        match.node,
        match.node,
        match.context
      ),
      EditorOperation.highlightNodes(tree, statement)
    );
  }

  analyzeSafety(match: MoveConstToOuterScopeMatch): Safety {
    const messages = new SafetyMessageList();
    return messages.produceSafe();
  }

  getSuggestion(
    match: MoveConstToOuterScopeMatch,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can move '${match.variableName}' to the top level.`,
      shortActionLabel: "Move",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: MoveConstToOuterScopeMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Move to top-level scope", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
