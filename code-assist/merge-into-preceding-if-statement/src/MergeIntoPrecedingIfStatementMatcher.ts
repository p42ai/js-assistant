
import {
  capture,
  matchers as m,
  predicates as p,
  PatternMatcher,
  BlockTerminatorStatement,
} from "@p42/engine";
import ts from "typescript";
import { MergeIntoPrecedingIfStatementMatch } from "./MergeIntoPrecedingIfStatementMatch";

const { ast, path } = m;

export class MergeIntoPrecedingIfStatementMatcher extends PatternMatcher<MergeIntoPrecedingIfStatementMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  constructor() {
    super(MergeIntoPrecedingIfStatementMatch);
  }

  createPattern() {
    const captures = {
      targetIfStatement: capture.node<ts.IfStatement>(),
      thenStatement: capture.node<ts.Statement>(),
    };

    return {
      match: ast.ifStatement({
        thenStatement: captures.thenStatement.record({
          match: BlockTerminatorStatement.isTerminated,
        }),
        elseStatement: p.isUndefined,
        constraints: [
          path.previousStatement(
            ast.ifStatement({
              thenStatement: captures.thenStatement.record(),
              elseStatement: p.isUndefined,
              constraints: [captures.targetIfStatement.record()],
            })
          ),
        ],
      }),
      captures,
    };
  }
}
