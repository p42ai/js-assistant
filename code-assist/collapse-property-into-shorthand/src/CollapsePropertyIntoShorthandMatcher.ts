
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { CollapsePropertyIntoShorthandCandidate } from "./CollapsePropertyIntoShorthandCandidate";

const { ast } = m;

export class CollapsePropertyIntoShorthandMatcher extends PatternMatcher<CollapsePropertyIntoShorthandCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.PropertyAssignment, ts.SyntaxKind.BindingElement],
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
        ast.propertyAssignment({
          name: identifier,
          initializer: identifier,
        }),
        ast.bindingElement({
          name: identifier,
          propertyName: identifier,
        })
      ),
      captures,
    };
  }
}
