import { checkNodeType } from "./checkNodeType";

export const stringType = checkNodeType((typeSystem, type) =>
  typeSystem.isString(type)
);
