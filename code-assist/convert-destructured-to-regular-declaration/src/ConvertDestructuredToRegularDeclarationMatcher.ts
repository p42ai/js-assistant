
import {
  BindingPattern,
  capture,
  Context,
  matchers as m,
  PatternMatcher,
} from "@p42/engine";
import ts from "typescript";
import { ConvertDestructuredToRegularDeclarationMatch } from "./ConvertDestructuredToRegularDeclarationMatch";

const { ast } = m;

export class ConvertDestructuredToRegularDeclarationMatcher extends PatternMatcher<ConvertDestructuredToRegularDeclarationMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableDeclaration],
  };

  constructor() {
    super(ConvertDestructuredToRegularDeclarationMatch);
  }

  createPattern() {
    const captures = {
      initializer: capture.node<ts.Expression>(),
      root: capture.node<ts.BindingPattern>(),
    };

    return {
      match: ast.variableDeclaration({
        initializer: ast.expression({
          constraints: [captures.initializer.record()],
        }),
        name: ast.bindingPattern({
          constraints: [captures.root.record()],
        }),
        parent: ast.variableDeclarationList(),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: ConvertDestructuredToRegularDeclarationMatch["node"],
    captures: ConvertDestructuredToRegularDeclarationMatch["captures"],
    context: Context
  ): ConvertDestructuredToRegularDeclarationMatch["data"] {
    return { bindings: BindingPattern.collectBindings(captures.root) };
  }
}
