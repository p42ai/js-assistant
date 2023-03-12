import { checkNodeType } from "./checkNodeType";

export const maybeNumberType = checkNodeType((typeSystem, type) =>
  typeSystem.canBeNumber(type)
);
