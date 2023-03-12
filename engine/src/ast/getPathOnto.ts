import ts from "typescript";

/**
 * Calculates the path from node onto targetPath.
 *
 * @return undefined if there is no path from node onto targetPath.
 */
export function getPathOnto(
  node: ts.Node,
  targetPath: Array<ts.Node>
): Array<ts.Node> | undefined {
  const currentRelativePath = [node];
  while (!targetPath.includes(currentRelativePath[0])) {
    if (currentRelativePath[0].parent == null) {
      return undefined;
    }

    currentRelativePath.unshift(currentRelativePath[0].parent);
  }
  return currentRelativePath;
}
