
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import { RemoveBracesMatch } from "./RemoveBracesMatch";

const { ast } = m;

export class RemoveBracesMatcher extends PatternMatcher<RemoveBracesMatch> {
  constructor() {
    super(RemoveBracesMatch);
  }

  createPattern() {
    const captures = {
      block: capture.node<RemoveBracesMatch["captures"]["block"]>(),
      statement: capture.node<RemoveBracesMatch["captures"]["statement"]>(),
    };

    const captureSingleStatementBlock = ast.singleStatementBlock({
      statement: captures.statement.record({
        match: p.isDefined(),
      }),
      constraints: [captures.block.record()],
    });

    return {
      match: p.or(
        ast.doStatement({
          statement: captureSingleStatementBlock,
        }),
        ast.ifStatement({
          thenStatement: captureSingleStatementBlock,
        }),
        ast.ifStatement({
          // do not capture else (handled separately):
          elseStatement: ast.singleStatementBlock({
            statement: p.isDefined(),
          }),
        }),
        ast.forStatement({
          statement: captureSingleStatementBlock,
        }),
        ast.forInStatement({
          statement: captureSingleStatementBlock,
        }),
        ast.forOfStatement({
          statement: captureSingleStatementBlock,
        }),
        ast.whileStatement({
          statement: captureSingleStatementBlock,
        })
      ),
      captures,
    };
  }
}
