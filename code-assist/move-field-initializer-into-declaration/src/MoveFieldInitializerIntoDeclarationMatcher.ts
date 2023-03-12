
import {
  capture,
  Context,
  isNodeStructureEqual,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { MoveFieldInitializerIntoDeclarationMatch } from "./MoveFieldInitializerIntoDeclarationMatch";

const { ast } = m;

// TODO move
export function isNodeStructureEqualIgnoringBindings(
  a: ts.Node | undefined,
  b: ts.Node | undefined,
  context: Context
): boolean {
  return isNodeStructureEqual(a, b, context, {
    ignoreOptionalChaining: false,
    ignoreBindings: true,
  });
}

export class MoveFieldInitializerIntoDeclarationMatcher extends PatternMatcher<MoveFieldInitializerIntoDeclarationMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.ExpressionStatement],
  };

  createMatch(
    node: MoveFieldInitializerIntoDeclarationMatch["node"],
    captures: MoveFieldInitializerIntoDeclarationMatch["captures"],
    data: MoveFieldInitializerIntoDeclarationMatch["data"],
    context: Context
  ): MoveFieldInitializerIntoDeclarationMatch {
    return new MoveFieldInitializerIntoDeclarationMatch(
      node,
      captures,
      data,
      context
    );
  }

  createPattern() {
    const captures = {
      fieldName: capture.node<ts.Identifier | ts.PrivateIdentifier>({
        ignoreOptionalChaining: false,
        // need to ignore bindings for now, because properties are not tagged as symbols
        ignoreBindings: true,
      }),
      initializationExpression: capture.node<ts.Expression>(),
      propertyDeclaration: capture.node<ts.PropertyDeclaration>(),
    };

    return {
      match: ast.expressionStatement({
        expression: ast.binaryExpression({
          left: ast.propertyAccessExpression({
            expression: ast.thisExpression(),
            name: captures.fieldName.record({
              match: p.or(ast.identifier(), ast.privateIdentifier()),
            }),
          }),
          right: captures.initializationExpression.record(),
        }),
        parent: ast.block({
          parent: ast.constructorDeclaration({
            parent: ast.classLike({
              members: p.some(
                ast.propertyDeclaration({
                  name: captures.fieldName.record({
                    match: p.or(ast.identifier(), ast.privateIdentifier()),
                  }),
                  modifiers: p.not(p.some(ast.staticKeyword)),
                  constraints: [captures.propertyDeclaration.record()],
                })
              ),
            }),
          }),
        }),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: MoveFieldInitializerIntoDeclarationMatch["node"],
    captures: MoveFieldInitializerIntoDeclarationMatch["captures"],
    context: Context
  ): MoveFieldInitializerIntoDeclarationMatch["data"] {
    return undefined;
  }
}
