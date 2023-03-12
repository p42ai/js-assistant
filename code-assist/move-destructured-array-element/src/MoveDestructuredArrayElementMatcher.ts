
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveDestructuredArrayElementMatch } from "./MoveDestructuredArrayElementMatch";

const { ast } = m;

export class MoveDestructuredArrayElementMatcher extends PatternMatcher<MoveDestructuredArrayElementMatch> {
  constructor() {
    super(MoveDestructuredArrayElementMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.ArrayBindingElement>>(),
    };

    return {
      match: ast.arrayBindingPattern({
        elements: m.captureSelectedNodes({
          capture: captures.selectedChildren,
          selectionType: "partial",
        }),
      }),
      captures,
    };
  }
}
