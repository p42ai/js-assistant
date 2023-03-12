
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { MergeNestedIfCandidate } from "./MergeNestedIfCandidate";

const { ast } = m;

export class MergeNestedIfMatcher extends PatternMatcher<MergeNestedIfCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  createPattern() {
    const captures = {
      innerIf: capture.node<ts.IfStatement>(),
    };

    const innerIf = ast.ifStatement({
      elseStatement: p.isUndefined,
      constraints: [captures.innerIf.record()],
    });

    return {
      match: ast.ifStatement({
        thenStatement: p.or(
          ast.singleStatementBlock({
            statement: innerIf,
          }),
          innerIf
        ),
        elseStatement: p.isUndefined,
      }),
      captures,
    };
  }
}
