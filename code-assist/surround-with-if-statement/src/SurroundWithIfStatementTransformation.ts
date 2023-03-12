
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  NodeRange,
  PrefixWhitespaceTriviaMove,
  Range,
  Safety,
  SafetyMessageList,
  Statement,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { SurroundWithIfStatementMatch } from "./SurroundWithIfStatementMatch";

export class SurroundWithIfStatementTransformation extends Transformation<SurroundWithIfStatementMatch> {
  async apply(match: SurroundWithIfStatementMatch, tree: TransformedNodeTree) {
    const { selectedStatements } = match.captures;

    const firstStatement = selectedStatements[0];
    const blockContent = match.node.statements;

    const condition = tree.createTrue();

    tree.remove(...selectedStatements);

    const ifStatement = tree.createIfStatement({
      expression: condition,
      thenStatement: tree.createBlock({
        statements: selectedStatements,
      }),
    });

    tree.insertStatement(
      match.node,
      ifStatement,
      blockContent.indexOf(firstStatement)
    );

    tree.updateTrivia(
      new PrefixWhitespaceTriviaMove(selectedStatements[0], ifStatement)
    );

    return EditorOperation.compose(
      EditorOperation.select({
        nodePath: tree.getNodePath(condition),
        offset: new Range(0, "true".length),
      })
    );
  }

  analyzeSafety(match: SurroundWithIfStatementMatch): Safety {
    const messages = new SafetyMessageList();

    // check if any binding is used after (i.e. outside of) the selected statements
    const errorBindings = Statement.getDeclaredBindingsThatAreUsedOutside(
      match.captures.selectedStatements,
      match.context
    );

    if (errorBindings.length === 1) {
      messages.error(
        `declared variable '${errorBindings[0].name}' is used after selected statements`
      );
    } else if (errorBindings.length > 1) {
      messages.error(
        `${errorBindings.length} declared variables are used after selected statements`
      );
    }

    return messages.produceUnknown();
  }

  getActionZones(
    match: SurroundWithIfStatementMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Surround with if", [
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}
