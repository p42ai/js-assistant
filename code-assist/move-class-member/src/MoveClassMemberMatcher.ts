
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { MoveClassMemberMatch } from "./MoveClassMemberMatch";

const { ast } = m;

export class MoveClassMemberMatcher extends PatternMatcher<MoveClassMemberMatch> {
  constructor() {
    super(MoveClassMemberMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.ClassElement>>(),
    };

    return {
      // TODO extract ast.classElement
      match: p.or(
        ast.classDeclaration({
          members: m.captureSelectedNodes({
            capture: captures.selectedChildren,
            selectionType: "partial",
          }),
        }),
        ast.classExpression({
          members: m.captureSelectedNodes({
            capture: captures.selectedChildren,
            selectionType: "partial",
          }),
        })
      ),
      captures,
    };
  }
}
