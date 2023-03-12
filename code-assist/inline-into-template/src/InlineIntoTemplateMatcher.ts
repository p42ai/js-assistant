import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { InlineIntoTemplateCandidate } from "./InlineIntoTemplateCandidate";

const { ast } = m;

export class InlineIntoTemplateMatcher extends PatternMatcher<InlineIntoTemplateCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.TemplateSpan],
  };

  createPattern() {
    const captures = {
      expression:
        capture.node<
          | ts.StringLiteral
          | ts.NoSubstitutionTemplateLiteral
          | ts.TemplateExpression
        >(),
    };

    return {
      match: ast.templateSpan({
        expression: captures.expression.record({
          match: p.or(
            ast.stringLiteral(),
            ast.noSubstitutionTemplateLiteral(),
            ast.templateExpression()
          ),
        }),
      }),
      captures,
    };
  }
}
