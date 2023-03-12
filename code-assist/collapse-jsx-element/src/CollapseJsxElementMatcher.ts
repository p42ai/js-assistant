
import { matchers as m, PatternMatcher, predicates as p } from "@p42/engine";
import ts from "typescript";
import { CollapseJsxElementCandidate } from "./CollapseJsxElementCandidate";

const { ast } = m;

export class CollapseJsxElementMatcher extends PatternMatcher<CollapseJsxElementCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.JsxElement],
  };

  createPattern() {
    const captures = {};

    return {
      match: ast.jsxElement({
        children: p.or(
          p.array(),
          p.array(
            ast.jsxText({
              containsOnlyTriviaWhiteSpaces: true,
            })
          )
        ),
      }),
      captures,
    };
  }
}
