import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { RemoveUnnecessaryJsxFragmentCandidate } from "./RemoveUnnecessaryJsxFragmentCandidate";

const { ast } = m;

export class RemoveUnnecessaryJsxFragmentMatcher extends PatternMatcher<RemoveUnnecessaryJsxFragmentCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.JsxFragment],
  };

  createPattern() {
    const captures = {
      replacement: capture.node<ts.Node>(),
    };

    const emptyText = ast.jsxText({
      containsOnlyTriviaWhiteSpaces: true,
    });

    return {
      match: ast.jsxFragment({
        children: p.array(
          emptyText,
          captures.replacement.record({
            match: p.or(
              ast.jsxElement(),
              ast.jsxSelfClosingElement(),
              ast.jsxFragment()
            ),
          }),
          emptyText
        ),
      }),
      captures,
    };
  }
}
