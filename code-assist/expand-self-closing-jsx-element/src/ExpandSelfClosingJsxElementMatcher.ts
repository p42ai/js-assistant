import { matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ExpandSelfClosingJsxElementCandidate } from "./ExpandSelfClosingJsxElementCandidate";

const { ast } = m;

export class ExpandSelfClosingJsxElementMatcher extends PatternMatcher<ExpandSelfClosingJsxElementCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.JsxSelfClosingElement],
  };

  createPattern() {
    const captures = {};

    return {
      match: ast.jsxSelfClosingElement(),
      captures,
    };
  }
}
