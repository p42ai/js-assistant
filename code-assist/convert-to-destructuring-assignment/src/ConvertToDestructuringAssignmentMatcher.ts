
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertToDestructuringAssignmentCandidate } from "./ConvertToDestructuringAssignmentCandidate";

const { ast } = m;

const finalChainElement = p.or(
  ast.thisExpression(),
  ast.identifier(),
  ast.parenthesizedExpression(),
  ast.objectLiteralExpression(),
  ast.newExpression()
);

const validChainElement = p.or(
  ast.propertyAccessExpression({
    isOptional: false,
  }),
  ast.elementAccessExpression({
    isOptional: false,
  }),
  ast.callExpression({
    isOptional: false,
  }),
  ast.nonNullExpression()
);

export class ConvertToDestructuringAssignmentMatcher extends PatternMatcher<ConvertToDestructuringAssignmentCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableDeclaration],
  };

  createPattern() {
    const captures = {
      variableName: capture.node<ts.Identifier>(),
      propertyName: capture.node<ts.Identifier>(),
    };

    return {
      match: ast.variableDeclaration({
        name: captures.variableName.record({ match: ast.identifier() }),
        initializer: ast.propertyAccessExpression({
          name: captures.propertyName.record({
            match: ast.identifier(),
          }),
        }),
      }),
      captures,
    };
  }

  /**
   * Validate that there is no optional chaining in the initializer chain.
   */
  verifyMatch(match: ConvertToDestructuringAssignmentCandidate): boolean {
    let currentChainElement = match.node.initializer;

    while (!finalChainElement(currentChainElement, match.context)) {
      if (!validChainElement(currentChainElement, match.context)) {
        return false;
      }

      // allowed because of prior validity check:
      const castedChainElement = currentChainElement as
        | ts.PropertyAccessExpression
        | ts.CallExpression
        | ts.ElementAccessExpression
        | ts.NonNullExpression
        | ts.ParenthesizedExpression
        | ts.AwaitExpression;

      currentChainElement = castedChainElement.expression;
    }

    return true;
  }

  deriveMatchData(
    matchedNode: ConvertToDestructuringAssignmentCandidate["node"],
    captures: ConvertToDestructuringAssignmentCandidate["captures"],
    context: Context
  ): ConvertToDestructuringAssignmentCandidate["data"] {
    const { variableName, propertyName } = captures;
    return {
      canBeShorthandExpression: variableName.text === propertyName.text,
    };
  }
}
