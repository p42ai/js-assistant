
import {
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { RemoveTrailingArrayDestructuringHolesMatch } from "./RemoveTrailingArrayDestructuringHolesMatch";

const { ast } = m;

export class RemoveTrailingArrayDestructuringHolesMatcher extends PatternMatcher<RemoveTrailingArrayDestructuringHolesMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.ArrayBindingPattern],
  };

  constructor() {
    super(RemoveTrailingArrayDestructuringHolesMatch);
  }

  createPattern() {
    const captures = {};

    return {
      match: ast.arrayBindingPattern({
        elements: p.or(
          p.emptyArray(),
          p.lastArrayElements(ast.omittedExpression())
        ),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: RemoveTrailingArrayDestructuringHolesMatch["node"],
    captures: RemoveTrailingArrayDestructuringHolesMatch["captures"],
    context: Context
  ): RemoveTrailingArrayDestructuringHolesMatch["data"] {
    const { elements } = matchedNode;
    const numberOfElements = elements.length;

    let trailingOmittedExpressionCount = 0;
    while (
      trailingOmittedExpressionCount < numberOfElements &&
      ts.isOmittedExpression(
        elements[numberOfElements - trailingOmittedExpressionCount - 1]
      )
    ) {
      trailingOmittedExpressionCount++;
    }

    return {
      trailingOmittedExpressionCount,
    };
  }
}
