import {
  capture,
  isConstantExpression,
  matchers as m,
  PatternMatcher,
} from "@p42/engine";
import ts from "typescript";
import { UndefinedAliasMatch, UndefinedAliasType } from "./UndefinedAliasMatch";

const { ast } = m;

export class VoidConstantMatcher extends PatternMatcher<UndefinedAliasMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.VoidExpression],
  };

  createPattern() {
    const captures = {
      type: capture.value<UndefinedAliasType>(),
    };

    return {
      match: captures.type.record({
        value: "void-constant",
        match: ast.voidExpression({
          expression: isConstantExpression,
        }),
      }),
      captures,
    };
  }
}
