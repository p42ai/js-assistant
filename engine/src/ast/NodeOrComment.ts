import ts from "typescript";

export type NodeOrComment = {
  kind: ts.SyntaxKind;
  pos: number;
  end: number;
  getStart?:
    | ((sourceFile?: ts.SourceFile, includeJsDocComment?: boolean) => number)
    | undefined;
};
