import { matchers as m, PatternMatcher, predicates as p } from "@p42/engine";
import ts from "typescript";
import { ConvertTemplateLiteralToStringCandidate } from "./ConvertTemplateLiteralToStringCandidate";

const { ast, constraint } = m;

export class ConvertTemplateLiteralToStringMatcher extends PatternMatcher<ConvertTemplateLiteralToStringCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.NoSubstitutionTemplateLiteral],
  };

  createPattern() {
    const captures = {};

    return {
      match: ast.noSubstitutionTemplateLiteral({
        constraints: [p.not(constraint.isInTaggedTemplate)],
      }),
      captures,
    };
  }
}
