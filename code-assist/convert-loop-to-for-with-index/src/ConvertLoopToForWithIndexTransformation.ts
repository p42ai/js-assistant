import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  factory,
  nameOracle,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertLoopToForWithIndexCandidate } from "./ConvertLoopToForWithIndexCandidate";

export class ConvertLoopToForWithIndexTransformation extends Transformation<ConvertLoopToForWithIndexCandidate> {
  async apply(
    match: ConvertLoopToForWithIndexCandidate,
    tree: TransformedNodeTree
  ) {
    const { arrayLoop } = match.captures;
    const { arrayExpression } = arrayLoop.captures;

    const variableName = arrayLoop.captures.elementBinding!.name;
    let body = match.node.statement;

    // TODO extract into pattern
    const type = (
      arrayLoop.captures.elementBinding?.declaringNodes[0]?.parent as
        | ts.VariableDeclaration
        | undefined
    )?.type;

    const indexVariableName = nameOracle.generateVariableName(
      nameOracle.indexVariableName(),
      match.context.getScope(body)
    );

    const elementVariableDeclaration = factory.createSingleVariableStatement({
      flags: ts.NodeFlags.Const,
      name: tree.createIdentifier({
        text: variableName,
      }),
      type,
      initializer: tree.createElementAccessExpression({
        expression: tree.copy(arrayExpression),
        argumentExpression: tree.createIdentifier({
          text: indexVariableName,
        }),
      }),
      tree,
    });

    if (ts.isBlock(body)) {
      tree.insertStatement(body, elementVariableDeclaration, 0);
    } else {
      body = tree.createBlock({
        statements: [elementVariableDeclaration, body],
      });
    }

    tree.replace(
      match.node,
      factory.createIndexedForLoop({
        indexVariableName,
        arrayExpression,
        statement: body,
        tree,
      })
    );
  }

  analyzeSafety(match: ConvertLoopToForWithIndexCandidate): Safety {
    return Safety.unknown();
  }

  getActionZones(
    match: ConvertLoopToForWithIndexCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to for loop", [
      {
        range: NodeRange.forStatement(match.node),
        level: CodeAssistLevel.QuickFix,
      },
      {
        range: NodeRange.loopHead(match.node),
        level: CodeAssistLevel.Regular,
      },
    ]);
  }
}
