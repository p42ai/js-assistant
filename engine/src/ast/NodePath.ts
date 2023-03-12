import ts from "typescript";

export type NodePath = Array<string | number>;

export const resolveNodePath = (
  nodePath: NodePath,
  sourceFile: ts.SourceFile
): ts.Node | undefined => {
  let current = sourceFile as any;
  for (const value of nodePath) {
    current = current[value];
    if (current == null) {
      return undefined;
    }
  }
  return current as ts.Node;
};
