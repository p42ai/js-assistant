import ts from "typescript";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";

export const createSingleVariableStatement = ({
  flags,
  name,
  exclamationToken,
  type,
  initializer,
  tree,
}: {
  flags: ts.NodeFlags | undefined;
  name: ts.BindingName;
  exclamationToken?: ts.ExclamationToken | null;
  type?: ts.TypeNode | null;
  initializer?: ts.Expression | null;
  tree: TransformedNodeTree;
}) =>
  tree.createVariableStatement({
    declarationList: tree.createVariableDeclarationList({
      declarations: [
        tree.createVariableDeclaration({
          name,
          exclamationToken,
          type,
          initializer,
        }),
      ],
      flags,
    }),
  });
