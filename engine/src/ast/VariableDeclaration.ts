import { ast } from "../matcher";
import { matchFromParent } from "./matchFromParent";

export const isNameOf = () =>
  matchFromParent((child) =>
    ast.variableDeclaration({
      name: child,
    })
  );
