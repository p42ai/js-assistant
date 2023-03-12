import { ast } from "../matcher";
import { matchFromParent } from "./matchFromParent";

export const isLeftSideOf = () =>
  matchFromParent((child) =>
    ast.assignmentExpression({
      left: child,
    })
  );
