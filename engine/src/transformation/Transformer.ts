import { AnyMatch } from "../matcher/engine/Match";
import { Safety } from "./safety/Safety";
import { TransformedNodeTree } from "./TransformedNodeTree.generated";

export abstract class Transformer<PATTERN extends AnyMatch, RESULT> {
  /**
   * Transforms the tree with the information provided by the match. When this
   * is executed through SourceDocument, it is guaranteed that the parent node
   * will not be directly or indirectly modified.
   *
   * TODO return delta information
   */
  abstract transform(match: PATTERN, tree: TransformedNodeTree): RESULT;

  /**
   * Evaluates if applying this transformation to the match could lead to an erroneous program.
   *
   * For example, side effects, changes in execution order, or different variable values that result
   * from a transformation can potentially lead to such issues.
   *
   * The safety information is shown to the user in the UI to help them with making refactoring
   * decisions.
   *
   * Default: Unknown Safety.
   */
  analyzeSafety(match: PATTERN): Safety {
    return Safety.unknown();
  }
}
