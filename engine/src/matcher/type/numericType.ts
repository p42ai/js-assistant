import { checkNodeType } from "./checkNodeType";

export const numericType = checkNodeType((typeSystem, type) =>
  typeSystem.isNumeric(type)
);
