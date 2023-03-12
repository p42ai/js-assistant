
import {
  Augmentation,
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { MoveNestedIfMatch } from "./MoveNestedIfMatch";

const { ast } = m;

export class MoveNestedIfMatcher extends PatternMatcher<MoveNestedIfMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  constructor() {
    super(MoveNestedIfMatch);
  }

  createPattern() {
    const captures = {
      innerThenIf: capture.node<ts.IfStatement>(),
      innerThenIfCondition: capture.node<ts.Expression>(),
    };

    return {
      match: ast.ifStatement({
        thenStatement: ast.singleStatementInOptionalBlock({
          statement: ast.ifStatement({
            expression: captures.innerThenIfCondition.record(),
            constraints: [captures.innerThenIf.record()],
          }),
        }),
        elseStatement: p.or(
          p.isUndefined,
          ast.singleStatementInOptionalBlock({
            statement: ast.ifStatement({
              expression: captures.innerThenIfCondition.record(),
            }),
          })
        ),
      }),
      captures,
    };
  }
}
