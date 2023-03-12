
import {
  capture,
  CommentAugmentation,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
  Range,
} from "@p42/engine";
import ts from "typescript";
import { UseTemplateLiteralCandidate } from "./UseTemplateLiteralCandidate";

const { ast } = m;

export class UseTemplateLiteralMatcher extends PatternMatcher<UseTemplateLiteralCandidate> {
  readonly requiresDeduplication: boolean = true;

  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  createPattern() {
    const captures = {
      parts: capture.set<ts.Expression>(),
    };

    // TODO extract into matcher library
    const noComments = p.define(
      "noComments",
      (node: ts.Node, context: Context) => {
        const allComments = CommentAugmentation.getValue(
          node.getSourceFile(),
          context
        )!;
        return !allComments.hasCommentsInRange(
          new Range(node.getStart(), node.getEnd())
        );
      }
    );

    // TODO extract into matcher library
    const isStringConcatenation = p.define(
      "isStringConcatenation",
      p.recursive<ts.Node, Context>((recursion) =>
        ast.binaryExpressionWithoutOrder({
          operator: ts.SyntaxKind.PlusToken,
          part1: p.or(
            ast.stringLiteral(),
            ast.noSubstitutionTemplateLiteral(),
            ast.templateExpression(),
            ast.parenthesizedExpression({
              expression: recursion,
            }),
            recursion
          ),
        })
      )
    );

    // TODO extract into matcher library
    function isSingleLine(node: ts.Node): boolean {
      const source = node.getSourceFile();

      return (
        source.getLineAndCharacterOfPosition(node.getStart()).line ===
        source.getLineAndCharacterOfPosition(node.getEnd()).line
      );
    }

    const stringConcatenationPart = (
      recursion: p.Predicate<ts.Node, Context>
    ) =>
      p.or(
        captures.parts.record(
          ast.stringLiteral({
            constraints: [noComments],
          })
        ),
        captures.parts.record(
          ast.noSubstitutionTemplateLiteral({
            constraints: [noComments],
          })
        ),
        captures.parts.record(
          ast.templateExpression({
            constraints: [noComments],
          })
        ),
        // recursion for parenthesized string concatenation parts:
        ast.parenthesizedExpression({
          expression: recursion,
        }),
        // need to try recursion before matching as expression to prevent overmatching:
        recursion,
        // remove parentheses around non-string-concatenation binary expressions when capturing:
        // TODO recursive parentheses:
        ast.parenthesizedExpression({
          expression: captures.parts.record(
            ast.expression({
              constraints: [noComments],
            })
          ),
        }),
        captures.parts.record(
          ast.expression({
            constraints: [noComments],
          })
        )
      );

    return {
      match: p.recursive<ts.Node, Context>((recursion) =>
        captures.parts.checkpoint(
          ast.binaryExpression({
            operator: ts.SyntaxKind.PlusToken,
            left: stringConcatenationPart(recursion),
            right: stringConcatenationPart(recursion),
            constraints: [isStringConcatenation, isSingleLine, noComments],
          })
        )
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: UseTemplateLiteralCandidate["node"],
    captures: UseTemplateLiteralCandidate["captures"],
    context: Context
  ): UseTemplateLiteralCandidate["data"] {
    return {
      target: captures.parts.every((part) => ts.isStringLiteral(part))
        ? "string"
        : "template literal",
    };
  }
}
