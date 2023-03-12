
import {
  capture,
  Context,
  FunctionLike,
  isLastStatementInBlock,
  Loop,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import {
  IntroduceEarlyReturnMatch,
  IntroduceEarlyReturnMatchType,
} from "./IntroduceEarlyReturnMatch";

const { ast } = m;

const endsWithReturn = p.not(
  p.or(
    ast.returnStatement(),
    ast.block({
      statements: p.lastArrayElements(ast.returnStatement()),
    })
  )
);

export class IntroduceEarlyReturnMatcher extends PatternMatcher<IntroduceEarlyReturnMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  createMatch(
    node: IntroduceEarlyReturnMatchType["node"],
    captures: IntroduceEarlyReturnMatchType["captures"],
    data: IntroduceEarlyReturnMatchType["data"],
    context: Context
  ): IntroduceEarlyReturnMatch {
    return new IntroduceEarlyReturnMatch(node, captures, data, context);
  }

  createPattern() {
    const captures = {
      container: capture.node<Loop.Loop | FunctionLike.FunctionLike>(),
    };

    return {
      match: ast.ifStatement({
        parent: ast.block({
          parent: captures.container.record({
            match: p.or(FunctionLike.isFunctionLike, Loop.isLoop),
          }),
        }),
        constraints: [isLastStatementInBlock],
      }),
      captures,
    };
  }

  verifyMatch(match: IntroduceEarlyReturnMatch): boolean {
    if (match.node.elseStatement == null) {
      return true;
    }

    return endsWithReturn(match.node.thenStatement, match.context);
  }
}
