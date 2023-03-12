
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import {
  MoveFieldInitializerIntoConstructorMatch,
  MoveFieldInitializerIntoConstructorMatchType,
} from "./MoveFieldInitializerIntoConstructorMatch";

const { ast } = m;

export class MoveFieldInitializerIntoConstructorMatcher extends PatternMatcher<MoveFieldInitializerIntoConstructorMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.PropertyDeclaration],
  };

  createMatch(
    node: MoveFieldInitializerIntoConstructorMatchType["node"],
    captures: MoveFieldInitializerIntoConstructorMatchType["captures"],
    data: MoveFieldInitializerIntoConstructorMatchType["data"],
    context: Context
  ): MoveFieldInitializerIntoConstructorMatch {
    return new MoveFieldInitializerIntoConstructorMatch(
      node,
      captures,
      data,
      context
    );
  }

  createPattern() {
    const captures = {
      fieldName: capture.node<ts.Identifier | ts.PrivateIdentifier>(),
      constructorBody: capture.node<ts.Block>(),
      fieldInitializer: capture.node<ts.Expression>(),
    };

    return {
      match: ast.propertyDeclaration({
        name: captures.fieldName.record({
          match: p.or(ast.identifier(), ast.privateIdentifier()),
        }),
        initializer: captures.fieldInitializer.record({
          match: p.isDefined(),
        }),
        modifiers: p.not(p.some(ast.staticKeyword)),
        parent: ast.classLike({
          members: p.some(
            ast.constructorDeclaration({
              body: captures.constructorBody.record({
                match: p.isDefined(),
              }),
            })
          ),
        }),
      }),
      captures,
    };
  }
}
