
import {
  lodashCall,
  LodashCallAugmentation,
} from "@p42/augmentation-lodash-call";
import { matchers as m, PatternMatcher, predicates as p } from "@p42/engine";
import { ReplaceLodashEveryWithJavascriptArrayEveryCandidate } from "./ReplaceLodashEveryWithJavascriptArrayEveryCandidate";

const { ast, type } = m;

export class ReplaceLodashEveryWithJavascriptArrayEveryMatcher extends PatternMatcher<ReplaceLodashEveryWithJavascriptArrayEveryCandidate> {
  candidates = {
    patterns: [LodashCallAugmentation],
  };

  requiredAugmentations = [LodashCallAugmentation];

  createPattern() {
    const captures = {};

    return {
      match: lodashCall({
        name: "every",
        args: p.array(
          type.array,
          p.or(ast.arrowFunction(), ast.functionExpression())
        ),
      }),
      captures,
    };
  }
}
