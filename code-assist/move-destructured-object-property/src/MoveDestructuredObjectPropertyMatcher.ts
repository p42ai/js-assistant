
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveDestructuredObjectPropertyMatch } from "./MoveDestructuredObjectPropertyMatch";

const { ast } = m;

export class MoveDestructuredObjectPropertyMatcher extends PatternMatcher<MoveDestructuredObjectPropertyMatch> {
  constructor() {
    super(MoveDestructuredObjectPropertyMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.BindingElement>>(),
    };

    return {
      // TODO spread, shorthand
      match: ast.objectBindingPattern({
        elements: m.captureSelectedNodes({
          capture: captures.selectedChildren,
          selectionType: "partial",
        }),
      }),
      captures,
    };
  }
}
