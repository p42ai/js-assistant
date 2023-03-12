
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveInterfaceMemberMatch } from "./MoveInterfaceMemberMatch";

const { ast } = m;

export class MoveInterfaceMemberMatcher extends PatternMatcher<MoveInterfaceMemberMatch> {
  constructor() {
    super(MoveInterfaceMemberMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.TypeElement>>(),
    };

    return {
      match: ast.interfaceDeclaration({
        members: m.captureSelectedNodes({
          capture: captures.selectedChildren,
          selectionType: "partial",
        }),
      }),
      captures,
    };
  }
}
