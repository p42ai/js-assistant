
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  NodeRange,
  nameOracle,
  Safety,
  SafetyMessageList,
  Statement,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { SurroundWithTryCatchCandidate } from "./SurroundWithTryCatchCandidate";

export class SurroundWithTryCatchTransformation extends Transformation<SurroundWithTryCatchCandidate> {
  async apply(match: SurroundWithTryCatchCandidate, tree: TransformedNodeTree) {
    const { selectedStatements } = match.captures;

    const firstStatement = selectedStatements[0];
    const blockContent = match.node.statements;

    tree.remove(...selectedStatements);

    const errorVariableName = nameOracle.generateVariableName(
      nameOracle.nameWithIncreasingNumber("error"),
      match.context.getScope(match.node)
    );

    const catchBlock = tree.createBlock({
      statements: [],
      forceLeadingNewLine: true,
    });

    tree.insertStatement(
      match.node,
      tree.createTryStatement({
        tryBlock: tree.createBlock({
          statements: selectedStatements,
        }),
        catchClause: tree.createCatchClause({
          variableDeclaration: tree.createVariableDeclaration({
            name: tree.createIdentifier({
              text: errorVariableName,
            }),
          }),
          block: catchBlock,
        }),
      }),
      blockContent.indexOf(firstStatement)
    );

    return EditorOperation.compose(
      EditorOperation.select({ nodePath: tree.getNodePath(catchBlock) })
    );
  }

  analyzeSafety(match: SurroundWithTryCatchCandidate): Safety {
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
    match: SurroundWithTryCatchCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Surround with try…catch", [
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}
