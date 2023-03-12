
import UndefinedAliasAugmentation, {
  undefinedAlias,
} from "@p42/augmentation-undefined-alias";
import { matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ReplaceVoid0WithUndefinedCandidate } from "./ReplaceVoid0WithUndefinedCandidate";

const { ast } = m;

export class ReplaceVoid0WithUndefinedMatcher extends PatternMatcher<ReplaceVoid0WithUndefinedCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.VoidExpression],
  };

  requiredAugmentations = [UndefinedAliasAugmentation];

  createPattern() {
    const captures = {};

    return {
      match: ast.voidExpression({
        constraints: [
          undefinedAlias(),
          (node, context) =>
            context.getScope(node).getBinding("undefined")?.isGlobal ?? true,
        ],
      }),
      captures,
    };
  }
}
