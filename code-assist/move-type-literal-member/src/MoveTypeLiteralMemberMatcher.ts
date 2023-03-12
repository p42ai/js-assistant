
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveTypeLiteralMemberMatch } from "./MoveTypeLiteralMemberMatch";

const { ast } = m;

export class MoveTypeLiteralMemberMatcher extends PatternMatcher<MoveTypeLiteralMemberMatch> {
  constructor() {
    super(MoveTypeLiteralMemberMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.TypeElement>>(),
    };

    return {
      match: ast.typeLiteral({
        members: m.captureSelectedNodes({
          capture: captures.selectedChildren,
          selectionType: "partial",
        }),
      }),
      captures,
    };
  }
}
