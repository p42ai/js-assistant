
import {
  capture,
  matchers as m,
  predicates as p,
  PatternMatcher,
} from "@p42/engine";
import ts from "typescript";
import { MoveVariableDeclarationMatch } from "./MoveVariableDeclarationMatch";

const { ast } = m;

export class MoveVariableDeclarationMatcher extends PatternMatcher<MoveVariableDeclarationMatch> {
  constructor() {
    super(MoveVariableDeclarationMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.VariableDeclaration>>(),
    };

    return {
      match: ast.variableDeclarationList({
        declarations: p.and(
          // do not match if there is only 1 variable declaration,
          // to prevent blocked zones from interfering with move statement:
          (list) => list.length > 1,
          m.captureSelectedNodes({
            capture: captures.selectedChildren,
            selectionType: "partial",
          })
        ),
      }),
      captures,
    };
  }
}
