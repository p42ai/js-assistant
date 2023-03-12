
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MergeNestedElseIfCandidate } from "./MergeNestedElseIfCandidate";

const { ast } = m;

export class MergeNestedElseIfMatcher extends PatternMatcher<MergeNestedElseIfCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  createPattern() {
    const captures = {
      innerIf: capture.node<ts.IfStatement>(),
    };

    return {
      match: ast.ifStatement({
        elseStatement: ast.singleStatementBlock({
          statement: captures.innerIf.record({
            match: ast.ifStatement({
              constraints: [ast.noLeadingComments()],
            }),
          }),
        }),
      }),
      captures,
    };
  }
}
