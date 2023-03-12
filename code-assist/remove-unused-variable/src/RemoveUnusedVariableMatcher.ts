
import {
  capture,
  Context,
  matchers as m,
  Node,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { RemoveUnusedVariableMatch } from "./RemoveUnusedVariableMatch";

const { ast, path } = m;

export class RemoveUnusedVariableMatcher extends PatternMatcher<RemoveUnusedVariableMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableDeclaration, ts.SyntaxKind.BindingElement],
  };

  constructor() {
    super(RemoveUnusedVariableMatch);
  }

  createPattern() {
    const captures = {
      variableName: capture.value<string>(),
      variableDeclaration: capture.node<ts.VariableDeclaration>(),
    };

    const matchVariableDeclaration = (
      name?: p.Predicate<ts.BindingName, Context>
    ) =>
      ast.variableDeclaration({
        name,
        parent: ast.variableDeclarationList({
          parent: ast.variableStatement({
            parent: p.not(ts.isModuleBlock),
            constraints: [p.not(Node.isDeclared), p.not(Node.isExported)],
          }),
        }),
        constraints: [captures.variableDeclaration.record()],
      });

    const name = ast.identifier({
      text: captures.variableName.record(),
      binding: (binding) => binding?.references.length === 1,
    });

    return {
      match: p.and(
        (node: ts.Node, context: Context) =>
          context.scriptMetadata.areTopLevelVariablesLocal,
        p.or(
          matchVariableDeclaration(name),
          ast.bindingElement({
            name,
            constraints: [path.declarationRoot(matchVariableDeclaration())],
          })
        )
      ),
      captures,
    };
  }
}
