import ts from "typescript";
import { Context } from "./engine/Context";
import { Match } from "./engine/Match";

/**
 * Returns subset of matches that do not have ancestor that is root of other match.
 * This avoids any overlap between different matches (which can lead to conflicting
 * edit and invalid source code).
 */
export function deduplicateMatches<PATTERN extends Match<any, any, any>>(
  matches: Array<PATTERN>,
  context: Context
): Array<PATTERN> {
  const nodes = new Set<ts.Node>();
  for (const match of matches) {
    nodes.add(match.node);
  }

  return matches.filter((match) =>
    context
      .getAncestors(match.node)
      .none((ancestor: ts.Node) => nodes.has(ancestor), context)
  );
}
