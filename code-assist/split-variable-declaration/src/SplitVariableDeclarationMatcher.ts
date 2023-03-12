
import { isBlockLike, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { SplitVariableDeclarationCandidate } from "./SplitVariableDeclarationCandidate";

const { ast } = m;

export class SplitVariableDeclarationMatcher extends PatternMatcher<SplitVariableDeclarationCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableStatement],
  };

  createPattern() {
    return {
      match: ast.variableStatement({
        declarationList: ast.variableDeclarationList({
          declarations: (declarations) => declarations.length >= 2,
        }),
        constraints: [(statement) => isBlockLike(statement.parent)],
      }),
      captures: {},
    };
  }
}
