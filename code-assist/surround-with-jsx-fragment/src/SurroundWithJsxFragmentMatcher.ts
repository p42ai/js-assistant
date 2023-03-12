
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { SurroundWithJsxFragmentCandidate } from "./SurroundWithJsxFragmentCandidate";

const { ast } = m;

export class SurroundWithJsxFragmentMatcher extends PatternMatcher<SurroundWithJsxFragmentCandidate> {
  candidates = {
    nodes: [
      ts.SyntaxKind.JsxElement,
      ts.SyntaxKind.JsxFragment,
      ts.SyntaxKind.JsxSelfClosingElement,
    ],
  };

  createPattern() {
    const captures = {
      type: capture.value<"single" | "multiple">(),
      selectedChildren: capture.value<Array<ts.JsxChild>>(),
    };

    const captureSelectedChildren = m.captureSelectedNodes({
      capture: captures.selectedChildren,
      selectionType: "full",
    });

    return {
      match: p.or(
        captures.type.record({
          value: "single",
          match: p.and(
            m.selectionRange(),
            p.or(
              ast.jsxElement(),
              ast.jsxFragment(),
              ast.jsxSelfClosingElement()
            )
          ),
        }),
        captures.type.record({
          value: "multiple",
          match: p.or(
            ast.jsxElement({
              children: captureSelectedChildren,
            }),
            ast.jsxFragment({
              children: captureSelectedChildren,
            })
          ),
        })
      ),
      captures,
    };
  }
}
