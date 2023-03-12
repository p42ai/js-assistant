
import {
  capture,
  Context,
  isNodeStructureEqual,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { MoveLastStatementOutOfIfElseCandidate } from "./MoveLastStatementOutOfIfElseCandidate";

const { ast } = m;

export class MoveLastStatementOutOfIfElseMatcher extends PatternMatcher<MoveLastStatementOutOfIfElseCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  createPattern() {
    const captures = {
      thenOccurrence: capture.node<ts.Statement>(),
      elseOccurrence: capture.node<ts.Statement>(),
    };

    const lastBlockStatementOrStandaloneStatement = (
      matcher: p.Predicate<ts.Statement | undefined, Context>
    ) =>
      p.and(
        p.not(ast.emptyBlock()), // exclude matching empty if-else
        p.or(
          ast.block({
            statements: p.lastArrayElements(matcher),
          }),
          matcher
        )
      );

    return {
      match: ast.ifStatement({
        thenStatement: lastBlockStatementOrStandaloneStatement(
          captures.thenOccurrence.record({
            match: p.isDefined(),
          })
        ),
        elseStatement: lastBlockStatementOrStandaloneStatement(
          captures.elseOccurrence.record({
            match: p.isDefined(),
          })
        ),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: MoveLastStatementOutOfIfElseCandidate["node"],
    captures: MoveLastStatementOutOfIfElseCandidate["captures"],
    context: Context
  ): MoveLastStatementOutOfIfElseCandidate["data"] {
    // TODO move into engine
    const isSingleStatementBlock = (node: ts.Node): node is ts.Block =>
      !ts.isBlock(node) || node.statements.length === 1;

    return {
      isSingleStatementIfElse:
        isSingleStatementBlock(captures.thenOccurrence.parent) &&
        isSingleStatementBlock(captures.elseOccurrence.parent),
    };
  }

  verifyMatch(match: MoveLastStatementOutOfIfElseCandidate): boolean {
    return isNodeStructureEqual(
      match.captures.thenOccurrence,
      match.captures.elseOccurrence,
      match.context,
      { ignoreBindings: true, ignoreOptionalChaining: false }
    );
  }
}
