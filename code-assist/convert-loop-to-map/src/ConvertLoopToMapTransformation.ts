import {
  ActionZone,
  createActionZones,
  EditorOperation,
  Safety,
  Statement,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { ConvertLoopToMapMatch } from "./ConvertLoopToMapMatch";

export class ConvertLoopToMapTransformation extends Transformation<ConvertLoopToMapMatch> {
  async apply(match: ConvertLoopToMapMatch, tree: TransformedNodeTree) {
    const { loop, variableDeclaration } = match.captures;

    // remove the element declaration from the body
    const elementDeclaration = loop.getElementDeclaration();
    const elementStatement =
      elementDeclaration == null
        ? undefined
        : Statement.getStatementAncestor(elementDeclaration);
    const { statements } = match.captures.block;

    const body = tree.updateBlock(match.captures.block, {
      statements: [
        ...statements.filter(
          (statement, i) =>
            i < statements.length - 1 && statement !== elementStatement
        ),
        tree.createReturnStatement({
          expression: match.getReturnExpression(),
        }),
      ],
    });

    const { parameters, renameOperation } =
      loop.createLoopFunctionParameters(tree);

    tree.replace(
      variableDeclaration,
      tree.updateVariableDeclaration(variableDeclaration, {
        initializer: tree.createCallExpression({
          expression: tree.createPropertyAccessExpression({
            expression: loop.captures.arrayExpression,
            name: match.getMethodName(),
          }),
          argumentsArray: [
            // TODO function vs arrow function should depend on ES version in settings:
            tree.createArrowFunction({
              parameters,
              body,
            }),
          ],
        }),
      })
    );

    tree.remove(loop.node);

    return EditorOperation.compose(renameOperation());
  }

  analyzeSafety(match: ConvertLoopToMapMatch): Safety {
    return Safety.unknown();
  }

  getActionZones(
    match: ConvertLoopToMapMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    const { loop } = match.captures;
    return createActionZones(`Convert to .${match.getMethodName()}()`, [
      {
        range: loop.getLoopHeadRange(),
      },
    ]);
  }
}
