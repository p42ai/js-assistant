import { checkNodeType } from "./checkNodeType";

export const booleanType = checkNodeType((typeSystem, type) =>
  typeSystem.isBoolean(type)
);
