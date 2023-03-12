import ts from "typescript";
import { isSingleDeclarationList } from "./VariableDeclarationList";

export const isSingleDeclarationStatement = (
  variableStatement: ts.VariableStatement
): boolean => isSingleDeclarationList(variableStatement.declarationList);
