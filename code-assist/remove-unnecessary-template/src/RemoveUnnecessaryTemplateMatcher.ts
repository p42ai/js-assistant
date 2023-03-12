import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { RemoveUnnecessaryTemplateCandidate } from "./RemoveUnnecessaryTemplateCandidate";

const { ast, constraint } = m;

export class RemoveUnnecessaryTemplateMatcher extends PatternMatcher<RemoveUnnecessaryTemplateCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.TemplateExpression],
  };

  createPattern() {
    const captures = {
      expression: capture.node<ts.Expression>(),
    };

    return {
      match: ast.templateExpression({
        head: ast.templateHead({
          text: "",
        }),
        templateSpans: p.array(
          ast.templateSpan({
            expression: captures.expression.record(),
            literal: ast.templateTail({
              text: "",
            }),
          })
        ),
        constraints: [p.not(constraint.isInTaggedTemplate)],
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: RemoveUnnecessaryTemplateCandidate["node"],
    captures: RemoveUnnecessaryTemplateCandidate["captures"],
    context: Context
  ): RemoveUnnecessaryTemplateCandidate["data"] {
    const { expression } = captures;

    if (
      ts.isStringLiteral(expression) ||
      ts.isTemplateExpression(expression) ||
      ts.isNoSubstitutionTemplateLiteral(expression)
    ) {
      return {
        isStringLike: true,
      };
    }

    const { typeSystem } = context;
    const type = typeSystem.getType(expression);

    return {
      isStringLike: type == null ? false : typeSystem.isString(type),
    };
  }
}
