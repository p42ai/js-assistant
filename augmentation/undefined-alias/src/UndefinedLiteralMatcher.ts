import {
  capture,
  GlobalProperty,
  matchers as m,
  PatternMatcher,
} from "@p42/engine";
import ts from "typescript";
import { UndefinedAliasMatch, UndefinedAliasType } from "./UndefinedAliasMatch";

const { ast } = m;

export class UndefinedLiteralMatcher extends PatternMatcher<UndefinedAliasMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.Identifier],
  };

  createPattern() {
    const captures = {
      type: capture.value<UndefinedAliasType>(),
    };

    return {
      match: captures.type.record({
        value: "undefined-literal",
        match: ast.identifier({
          text: GlobalProperty.undefined,
          binding: (binding) => binding?.isGlobal === true,
        }),
      }),
      captures,
    };
  }
}
