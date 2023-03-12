
import {
  capture,
  Context,
  isNodeStructureEqual,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { MoveFirstStatementOutOfIfElseCandidate } from "./MoveFirstStatementOutOfIfElseCandidate";

const { ast } = m;

export class MoveFirstStatementOutOfIfElseMatcher extends PatternMatcher<MoveFirstStatementOutOfIfElseCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  createPattern() {
    const captures = {
      thenOccurrence: capture.node<ts.Statement>(),
      elseOccurrence: capture.node<ts.Statement>(),
    };

    const firstBlockStatementOrStandaloneStatement = (
      matcher: p.Predicate<ts.Statement | undefined, Context>
    ) =>
      p.and(
        p.not(ast.emptyBlock()), // exclude matching empty if-else
        p.or(
          ast.block({
            statements: p.firstArrayElements(matcher),
          }),
          matcher
        )
      );

    return {
      match: ast.ifStatement({
        thenStatement: firstBlockStatementOrStandaloneStatement(
          captures.thenOccurrence.record({
            match: p.isDefined(),
          })
        ),
        elseStatement: firstBlockStatementOrStandaloneStatement(
          captures.elseOccurrence.record({
            match: p.isDefined(),
          })
        ),
      }),
      captures,
    };
  }

  verifyMatch(match: MoveFirstStatementOutOfIfElseCandidate): boolean {
    return isNodeStructureEqual(
      match.captures.thenOccurrence,
      match.captures.elseOccurrence,
      match.context,
      { ignoreBindings: true, ignoreOptionalChaining: false }
    );
  }
}
