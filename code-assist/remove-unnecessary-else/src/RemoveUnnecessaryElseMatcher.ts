import {
  capture,
  FunctionLike,
  isLastStatementInBlock,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { RemoveUnnecessaryElseCandidate } from "./RemoveUnnecessaryElseCandidate";

const { ast, path } = m;

export class RemoveUnnecessaryElseMatcher extends PatternMatcher<RemoveUnnecessaryElseCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  createPattern() {
    const captures = {
      block: capture.node<ts.Block>(),
      thenWithoutReturn: capture.value<boolean>(),
    };

    return {
      match: p.or(
        ast.ifStatement({
          thenStatement: p.or(
            captures.thenWithoutReturn.record({
              value: false,
              match: p.or(
                ast.block({
                  statements: p.lastArrayElements(ast.returnStatement()),
                }),
                ast.returnStatement()
              ),
            }),
            captures.thenWithoutReturn.record({
              value: true,
            })
          ),
          elseStatement: p.isDefined(),
          constraints: [
            path.parent(
              captures.block.record({
                match: ast.block(),
              })
            ),
          ],
        })
      ),
      captures,
    };
  }

  verifyMatch(match: RemoveUnnecessaryElseCandidate): boolean {
    // TODO automatic simplification of conditional expression to ||
    return match.captures.thenWithoutReturn
      ? isLastStatementInBlock(match.node) &&
          FunctionLike.isFunctionLike(match.captures.block.parent)
      : true;
  }
}
