import { getSyntaxKindLabel } from "./getSyntaxKindLabel";
import { NodeOrComment } from "./NodeOrComment";

/**
 * Unique stable ID for the type syntax tree range (e.g. a node or a comment)
 * that should have the same result on different parses of the same content.
 *
 * Currently `$pos-$end-$humanReadableKind`.
 */
export function getId(node: NodeOrComment | undefined) {
  if (node === undefined) {
    return undefined;
  }

  return `${node.pos}-${node.end}-${getSyntaxKindLabel(node.kind)}`;
}
