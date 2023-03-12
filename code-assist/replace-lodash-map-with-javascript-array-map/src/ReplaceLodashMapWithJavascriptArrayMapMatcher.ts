
import {
  lodashCall,
  LodashCallAugmentation,
} from "@p42/augmentation-lodash-call";
import { matchers as m, PatternMatcher, predicates as p } from "@p42/engine";
import { ReplaceLodashMapWithJavascriptArrayMapCandidate } from "./ReplaceLodashMapWithJavascriptArrayMapCandidate";

const { ast, type } = m;

export class ReplaceLodashMapWithJavascriptArrayMapMatcher extends PatternMatcher<ReplaceLodashMapWithJavascriptArrayMapCandidate> {
  candidates = {
    patterns: [LodashCallAugmentation],
  };

  requiredAugmentations = [LodashCallAugmentation];

  createPattern() {
    const captures = {};

    return {
      match: lodashCall({
        name: "map",
        args: p.array(
          type.array,
          p.or(ast.arrowFunction(), ast.functionExpression())
        ),
      }),
      captures,
    };
  }
}
