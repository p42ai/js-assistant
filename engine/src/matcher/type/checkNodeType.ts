import ts from "typescript";
import { TypeSystem } from "../../ast/TypeSystem";
import { Context } from "../engine/Context";

export const checkNodeType =
  (checkType: (typeSystem: TypeSystem, type: ts.Type) => boolean) =>
  (node: ts.Node, { typeSystem }: Context) => {
    const type = typeSystem.getType(node);
    return type != null && checkType(typeSystem, type);
  };
