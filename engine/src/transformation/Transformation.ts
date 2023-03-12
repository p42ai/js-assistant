import ts from "typescript";
import { AnyMatch } from "../matcher/engine/Match";
import { ActionZone } from "./ActionZone";
import { BlockedZone } from "./BlockedZone";
import { EditorOperation } from "./editor-operation/index";
import { Safety } from "./safety/Safety";
import { Suggestion } from "./Suggestion";
import { TransformedNodeTree } from "./TransformedNodeTree.generated";
import { InteractiveInput } from "./InteractiveInput";

export abstract class Transformation<PATTERN extends AnyMatch> {
  constructor(
    /**
     * Identifier of the transformation. Used to distinguish different transformations in the same refactoring.
     * Default is the empty string, which is sufficient when there is a single transformation.
     */
    readonly id: string = ""
  ) {}

  /**
   * Checks if this transformation can be applied on the match. Defaults to true.
   */
  isApplicable(match: PATTERN): boolean {
    return true;
  }

  /**
   * Returns nodes that would be affected by this transformation. This is used to detect
   * conflicts between multiple transformations. All (sibling) nodes that are
   * replaced/removed by this transformation should be returned. Defaults to the matched node.
   */
  getImpactedNodes(match: PATTERN): Array<ts.Node> {
    return [match.node];
  }

  /**
   * Transforms the tree with the information provided by the match. When this
   * is executed through SourceDocument, it is guaranteed that the parent node
   * will not be directly or indirectly modified.
   */
  abstract apply(
    match: PATTERN,
    tree: TransformedNodeTree,
    interactiveInput: InteractiveInput | undefined
  ): Promise<Array<EditorOperation> | void>;

  /**
   * Returns action zones. By default, it is the matched node. This method is intended
   * to be overridden by code actions that require different activation zones.
   *
   * The first activation zone is the main activation zone, and its location information is
   * used when reporting line numbers in P42 for GitHub and when highlighting matches in P42.
   */
  abstract getActionZones(
    match: PATTERN,
    isSuggestion: boolean
  ): Array<ActionZone>;

  /**
   * Returns blocked zones. Blocked zones are zones where other code actions of the
   * same code action kind should not be available. This is e.g. important for the
   * move system, where switching to an outer move depending on position should be
   * prevented (because it blocks clear inverse actions). Only called when the
   * transformation is **not** applicable.
   */
  getBlockedZones(match: PATTERN): Array<BlockedZone> | null {
    return null;
  }

  /**
   * Returns a suggestion or `null` if a specific match is not a suggestion. Defaults to null.
   */
  getSuggestion(match: PATTERN, safety: Safety): Suggestion | null {
    return null;
  }

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
