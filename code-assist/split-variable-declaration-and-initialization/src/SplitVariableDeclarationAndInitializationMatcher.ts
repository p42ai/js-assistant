import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { SplitVariableDeclarationAndInitializationCandidate } from "./SplitVariableDeclarationAndInitializationCandidate";

const { ast } = m;

export class SplitVariableDeclarationAndInitializationMatcher extends PatternMatcher<SplitVariableDeclarationAndInitializationCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableDeclaration],
  };

  createPattern() {
    const captures = {
      name: capture.value<string>(),
      initializer: capture.node<ts.Expression>(),
      declarationList: capture.node<ts.VariableDeclarationList>(),
      block: capture.node<ts.SourceFile>(),
      insertionIndex: capture.value<number>(),
    };

    return {
      match: ast.variableDeclaration({
        name: ast.identifier({
          text: captures.name.record(),
        }),
        initializer: p.isDefined(captures.initializer.record()),
        parent: captures.declarationList.record({
          match: ast.variableDeclarationList({
            declarations: m.array.hasLength(1),
            parent: ast.variableStatement({
              parent: captures.block.record({
                match: ast.blockLike(),
              }),
            }),
          }),
        }),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: SplitVariableDeclarationAndInitializationCandidate["node"],
    captures: SplitVariableDeclarationAndInitializationCandidate["captures"]
  ): SplitVariableDeclarationAndInitializationCandidate["data"] {
    const variableStatement = captures.declarationList
      .parent as ts.VariableStatement;
    return {
      insertionIndex: captures.block.statements.indexOf(variableStatement) + 1,
    };
  }
}
