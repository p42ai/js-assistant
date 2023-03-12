
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  matchers as m,
  NodeRange,
  Range,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { MoveFieldInitializerIntoConstructorMatch } from "./MoveFieldInitializerIntoConstructorMatch";

const { ast } = m;

export class MoveFieldInitializerIntoConstructorTransformation extends Transformation<MoveFieldInitializerIntoConstructorMatch> {
  async apply(
    match: MoveFieldInitializerIntoConstructorMatch,
    tree: TransformedNodeTree
  ) {
    const { constructorBody } = match.captures;

    tree.replace(
      match.node,
      tree.updatePropertyDeclaration(match.node, {
        initializer: null,
      })
    );

    const assignmentExpression = tree.createExpressionStatement({
      expression: tree.createBinaryExpression({
        left: tree.createPropertyAccessExpression({
          expression: tree.createThisExpression(),
          name: tree.copy(match.captures.fieldName),
        }),
        operator: ts.SyntaxKind.EqualsToken,
        right: match.captures.fieldInitializer,
      }),
    });

    const constructorStartsWithSuperCall = ast.expressionStatement({
      expression: ast.callExpression({
        expression: ast.superKeyword,
      }),
    })(constructorBody.statements[0], match.context);

    tree.replace(
      constructorBody,
      tree.updateBlock(constructorBody, {
        statements: constructorStartsWithSuperCall
          ? [
              constructorBody.statements[0],
              assignmentExpression,
              ...constructorBody.statements.slice(1),
            ]
          : [assignmentExpression, ...constructorBody.statements],
      })
    );
  }

  analyzeSafety(match: MoveFieldInitializerIntoConstructorMatch): Safety {
    return Safety.unknown();
  }

  getActionZones(
    match: MoveFieldInitializerIntoConstructorMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Move initialization into constructor", [
      {
        range: new Range(
          match.node.getStart(),
          NodeRange.firstCharactersOfNode(
            match.captures.fieldInitializer,
            3
          ).end
        ),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
