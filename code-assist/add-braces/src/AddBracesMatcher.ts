import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import { AddBracesMatch } from "./AddBracesMatch";

const { ast } = m;

export class AddBracesMatcher extends PatternMatcher<AddBracesMatch> {
  constructor() {
    super(AddBracesMatch);
  }

  createPattern() {
    const captures = {
      statement: capture.node<AddBracesMatch["captures"]["statement"]>(),
    };

    const captureSingleStatement = p.and(
      p.not(ast.block()),
      captures.statement.record()
    );

    return {
      match: p.or(
        ast.doStatement({
          statement: captureSingleStatement,
        }),
        ast.ifStatement({
          thenStatement: captureSingleStatement,
        }),
        ast.ifStatement({
          // do not capture else (handled separately):
          elseStatement: p.and(p.isDefined(), p.not(ast.block())),
        }),
        ast.forStatement({
          statement: captureSingleStatement,
        }),
        ast.forInStatement({
          statement: captureSingleStatement,
        }),
        ast.forOfStatement({
          statement: captureSingleStatement,
        }),
        ast.whileStatement({
          statement: captureSingleStatement,
        })
      ),
      captures,
    };
  }
}
