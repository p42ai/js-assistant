
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveIfElseIfBranchesMatch } from "./MoveIfElseIfBranchesMatch";

const { ast } = m;

export class MoveIfElseIfBranchesMatcher extends PatternMatcher<MoveIfElseIfBranchesMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  constructor() {
    super(MoveIfElseIfBranchesMatch);
  }

  createPattern() {
    const captures = {
      elseIf: capture.node<ts.IfStatement>(),
    };

    return {
      match: ast.ifStatement({
        elseStatement: ast.ifStatement({
          constraints: [captures.elseIf.record()],
        }),
      }),
      captures,
    };
  }
}
