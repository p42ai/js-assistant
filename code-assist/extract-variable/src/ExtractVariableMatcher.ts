
import {
  AssignmentExpression,
  Context,
  Expression,
  matchers as m,
  PatternMatcher,
  getBestTargetScope,
  predicates as p,
  VariableDeclaration,
} from "@p42/engine";
import { ExtractVariableCandidate } from "./ExtractVariableCandidate";

const { ast } = m;

// TODO extract into engine?
const isAssignmentTarget = p.or(
  AssignmentExpression.isLeftSideOf(),
  VariableDeclaration.isNameOf()
);

export class ExtractVariableMatcher extends PatternMatcher<ExtractVariableCandidate> {
  candidates = {
    nodes: Expression.SYNTAX_KINDS,
  };

  createPattern() {
    const captures = {};

    return {
      match: ast.expression({
        constraints: [
          m.selectionRange(),
          p.not(ast.spreadElement()),
          p.not(ast.assignmentExpression()),
          p.not(
            ast.identifier({
              binding: p.isUndefined,
            })
          ),
          p.not(isAssignmentTarget),
        ],
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: ExtractVariableCandidate["node"],
    captures: ExtractVariableCandidate["captures"],
    context: Context
  ): ExtractVariableCandidate["data"] {
    return getBestTargetScope(matchedNode, context);
  }
}
