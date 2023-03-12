import ts from "typescript";
import { Context } from "./Context";

/**
 * An identified pattern occurrence in an AST.
 *
 * Every match has a key AST node that it matches on and a set of additional captures.
 */
export interface Match<
  NODE extends ts.Node,
  CAPTURES extends Record<string, any>,
  DATA extends Record<string, any> | undefined
> {
  /**
   * The AST node that was matched by the pattern.
   */
  readonly node: NODE;

  /**
   * Captures from matching the AST node.
   */
  readonly captures: CAPTURES;

  /**
   * Derived data (based on node and captures).
   */
  readonly data: DATA;

  /**
   * Context that the match was made in. Associated with the match, because it is often used
   * in the same methods (data clump) and because working with a match in a different context
   * can lead to subtle bugs (e.g. when it depends on selection ranges).
   */
  readonly context: Context;
}

export type AnyMatch = Match<any, any, any>;
