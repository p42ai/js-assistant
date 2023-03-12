import {
  matchers as m,
  PatternMatcher,
  predicates as p,
  VariableDeclarationKind,
} from "@p42/engine";
import ts from "typescript";
import { ConvertLetToConstCandidate } from "./ConvertLetToConstCandidate";

const { ast } = m;

export class ConvertLetToConstMatcher extends PatternMatcher<ConvertLetToConstCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableDeclarationList],
  };

  createPattern() {
    const captures = {};

    return {
      match: ast.variableDeclarationList({
        kind: VariableDeclarationKind.Let,
        declarations: p.array(
          p.or(
            // regular variable
            ast.variableDeclaration({
              name: ast.identifier({
                binding: ast.binding({ isConstant: true }),
              }),
              initializer: p.isDefined(),
            }),
            // for-of / for-in loops head:
            ast.variableDeclaration({
              name: ast.identifier({
                binding: ast.binding({ isConstant: true }),
              }),
              initializer: p.isUndefined,
              parent: ast.variableDeclarationList({
                parent: p.or(ast.forInStatement(), ast.forOfStatement()),
              }),
            })
          )
        ),
      }),
      captures,
    };
  }
}
