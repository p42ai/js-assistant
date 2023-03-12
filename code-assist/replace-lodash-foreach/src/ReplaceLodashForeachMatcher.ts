
import {
  lodashCall,
  LodashCallAugmentation,
  LodashCallMatch,
} from "@p42/augmentation-lodash-call";
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ReplaceLodashForeachCandidate } from "./ReplaceLodashForeachCandidate";

const { ast, constraint, path } = m;

export class ReplaceLodashForeachMatcher extends PatternMatcher<ReplaceLodashForeachCandidate> {
  candidates = {
    patterns: [LodashCallAugmentation],
  };

  requiredAugmentations = [LodashCallAugmentation];

  createPattern() {
    const captures = {
      lodashCall: capture.value<LodashCallMatch>(),
      collection: capture.node<ts.Expression>(),
      iteratee: capture.node<ts.ArrowFunction | ts.FunctionExpression>(),
    };

    return {
      match: lodashCall({
        name: p.includedIn("each", "forEach"),
        args: p.array(
          captures.collection.record(),
          captures.iteratee.record({
            match: p.or(
              ast.arrowFunction({
                body: ast.block(),
                constraints: [constraint.hasNoReturnStatement],
              }),
              ast.functionExpression({
                constraints: [constraint.hasNoReturnStatement],
              })
            ),
          })
        ),
        constraints: [captures.lodashCall.record()],
        // limit to statements (to allow for if check & to avoid null -> undefined return values changes):
        node: path.parent(ast.expressionStatement()),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: ReplaceLodashForeachCandidate["node"],
    captures: ReplaceLodashForeachCandidate["captures"],
    context: Context
  ): ReplaceLodashForeachCandidate["data"] {
    const { typeSystem } = context;
    const collectionType = typeSystem.getType(captures.collection);
    const collectionKind =
      collectionType == null
        ? undefined
        : typeSystem.isArrayType(collectionType, true)
        ? "array"
        : typeSystem.isObjectType(collectionType)
        ? "object"
        : typeSystem.isAny(collectionType)
        ? "unknown"
        : undefined;

    return {
      collectionKind,
      collectionCanBeNull:
        collectionKind == null ||
        collectionKind === "unknown" ||
        typeSystem.canBeNullish(collectionType!),
    };
  }
}
