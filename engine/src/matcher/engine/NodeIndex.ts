import ts from "typescript";

import { TYPESCRIPT_SYNTAX_KIND_COUNT } from "../../ast/getSyntaxKindLabel";
import { Flags } from "../../util/Flags";

export class NodeIndex {
  // Performance: Using array for fast syntax kind lookup:
  readonly nodesBySyntaxKind: Array<Array<ts.Node>> = Array(
    TYPESCRIPT_SYNTAX_KIND_COUNT
  );

  // Performance: Array is 2-4 times faster than Set on push operations:
  readonly allNodes = new Array<ts.Node>();

  constructor(readonly sourceFile: ts.SourceFile) {
    // init all syntax kinds:
    for (let i = 0; i < TYPESCRIPT_SYNTAX_KIND_COUNT; i++) {
      this.nodesBySyntaxKind[i] = [];
    }

    // important: each node is visited at most once
    // (no node must be added twice to the list of nodes)
    const visitor = (node: ts.Node): void => {
      // exclude subtrees for parents that have parse errors:
      if (Flags.isSet(node.flags, ts.NodeFlags.ThisNodeHasError)) {
        return;
      }

      this.allNodes.push(node);
      this.nodesBySyntaxKind[node.kind].push(node);

      ts.forEachChild(node, visitor);
    };

    visitor(sourceFile);
  }

  getByKind(kind: ts.SyntaxKind) {
    return this.nodesBySyntaxKind[kind];
  }

  hasKind(kind: ts.SyntaxKind): boolean {
    const nodes = this.nodesBySyntaxKind[kind];
    return nodes != null && nodes.length > 0;
  }
}
