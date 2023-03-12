import ts from "typescript";

export type Replacement = {
  originalNode: ts.Node;
  replacementNode: ts.Node | null;
};
