
import {
  arrayLoop,
  ArrayLoopAugmentation,
  ArrayLoopMatch,
} from "@p42/augmentation-array-loop";
import {
  AssignmentOperatorMapping,
  Binding,
  capture,
  Context,
  findClones,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertLoopToForOfCandidate } from "./ConvertLoopToForOfCandidate";

const { ast, constraint } = m;

const matchIsArrayAccessWithIndex = (
  arrayExpression: ts.Expression,
  indexBinding: Binding
) =>
  ast.elementAccessExpression({
    expression: m.equalsNodeStructure(arrayExpression),
    argumentExpression: ast.identifier({
      binding: p.same<Binding | undefined, Context>(indexBinding),
    }),
  });

export class ConvertLoopToForOfMatcher extends PatternMatcher<ConvertLoopToForOfCandidate> {
  candidates = {
    patterns: [ArrayLoopAugmentation],
  };

  requiredAugmentations = [ArrayLoopAugmentation];

  createPattern() {
    const captures = {
      arrayLoop: capture.value<ArrayLoopMatch>(),
    };

    return {
      match: p.or(
        arrayLoop({
          type: "for-each",
          constraints: [captures.arrayLoop.record()],
        }),
        arrayLoop({
          type: "for-element",
          constraints: [
            // TODO this needs changing: filter to block references, make sure they all refer to array + index, no write operations
            (loopMatch, context) => {
              const { indexBinding, arrayExpression } = loopMatch.captures;

              if (indexBinding == null) {
                return false;
              }

              const indexReferencesInLoopBody =
                loopMatch.getIndexReferencesInBody()!;

              const isArrayAccessWithIndex = matchIsArrayAccessWithIndex(
                arrayExpression,
                indexBinding
              );

              // TODO auto-convert to indexReferencesInLoopBody.some
              for (const indexReference of indexReferencesInLoopBody) {
                if (
                  !isArrayAccessWithIndex(
                    indexReference.identifier.parent,
                    context
                  )
                ) {
                  return false;
                }
              }

              const isArrayWrite = ast.binaryExpression({
                left: isArrayAccessWithIndex,
                operator: [
                  // TODO refactor: equalsToken should be in assignment operators
                  ts.SyntaxKind.EqualsToken,
                  ...AssignmentOperatorMapping.getAssignmentOperators(),
                ],
              });

              // TODO auto-convert to indexReferencesInLoopBody.some
              for (const indexReference of indexReferencesInLoopBody) {
                if (
                  isArrayWrite(indexReference.identifier.parent.parent, context)
                ) {
                  return false;
                }
              }

              // loop header: declare, compare, increment (=3) + loop body count
              return (
                indexBinding.references.length ===
                3 + indexReferencesInLoopBody.length
              );
            },
            captures.arrayLoop.record(),
          ],
        })
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: ConvertLoopToForOfCandidate["node"],
    captures: ConvertLoopToForOfCandidate["captures"],
    context: Context
  ): ConvertLoopToForOfCandidate["data"] {
    const { arrayLoop } = captures;

    const arrayOccurrencesInLoopBody = findClones(
      arrayLoop.captures.arrayExpression,
      arrayLoop.captures.body,
      context
    );

    const isArrayAccessWithIndex = matchIsArrayAccessWithIndex(
      arrayLoop.captures.arrayExpression,
      arrayLoop.captures.indexBinding!
    );

    // TODO auto-convert to indexReferencesInLoopBody.some
    for (const arrayOccurrence of arrayOccurrencesInLoopBody) {
      if (!isArrayAccessWithIndex(arrayOccurrence.parent, context)) {
        return {
          isArrayPotentiallyModifiedInLoop: true,
        };
      }
    }

    return {
      isArrayPotentiallyModifiedInLoop: false,
    };
  }
}
