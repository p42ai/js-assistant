
import {
  capture,
  matchers as m,
  predicates as p,
  PatternMatcher,
} from "@p42/engine";
import ts from "typescript";
import { ExpandShorthandPropertyCandidate } from "./ExpandShorthandPropertyCandidate";

const { ast } = m;

export class ExpandShorthandPropertyMatcher extends PatternMatcher<ExpandShorthandPropertyCandidate> {
  candidates = {
    nodes: [
      ts.SyntaxKind.ShorthandPropertyAssignment,
      ts.SyntaxKind.BindingElement,
    ],
  };

  createPattern() {
    const captures = {
      identifierName: capture.value<string>(),
    };
    const identifier = ast.identifier({
      text: captures.identifierName.record(),
    });

    return {
      match: p.or(
        ast.shorthandPropertyAssignment({
          name: identifier,
        }),
        ast.bindingElement({
          name: identifier,
          propertyName: p.isUndefined,
          isRest: false,
        })
      ),
      captures,
    };
  }
}
