import { TransformedNodeTree } from "@p42/engine";
import ts from "typescript";

export function wrapInBlock(
  statement: ts.Statement,
  tree: TransformedNodeTree
) {
  tree.replace(
    statement,
    tree.createBlock({
      statements: [statement],
    })
  );
}
