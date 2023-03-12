
import {
  Context,
  Expression,
  getBestTargetScope,
  matchers as m,
  PatternMatcher,
} from "@p42/engine";
import {
  SelectExpressionOccurrencesMatch,
  SelectExpressionOccurrencesMatchType,
} from "./SelectExpressionOccurrencesMatch";

const { ast } = m;

export class SelectExpressionOccurrencesMatcher extends PatternMatcher<SelectExpressionOccurrencesMatch> {
  candidates = {
    nodes: Expression.SYNTAX_KINDS,
  };

  createMatch(
    node: SelectExpressionOccurrencesMatchType["node"],
    captures: SelectExpressionOccurrencesMatchType["captures"],
    data: SelectExpressionOccurrencesMatchType["data"],
    context: Context
  ): SelectExpressionOccurrencesMatch {
    return new SelectExpressionOccurrencesMatch(node, captures, data, context);
  }

  createPattern() {
    const captures = {};

    return {
      match: ast.expression({
        constraints: [m.selectionRange()],
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: SelectExpressionOccurrencesMatch["node"],
    captures: SelectExpressionOccurrencesMatch["captures"],
    context: Context
  ): SelectExpressionOccurrencesMatch["data"] {
    return {
      occurrences: getBestTargetScope(matchedNode, context).occurrences,
    };
  }

  verifyMatch(match: SelectExpressionOccurrencesMatch): boolean {
    return match.occurrenceCount >= 2;
  }
}
