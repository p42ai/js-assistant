import { checkNodeType } from "./checkNodeType";

export const arrayType = checkNodeType((typeSystem, type) =>
  typeSystem.isArrayType(type)
);
