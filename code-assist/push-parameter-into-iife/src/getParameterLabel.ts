
import ts from "typescript";

export const getParameterLabel = (parameter: ts.ParameterDeclaration): string =>
  ts.isIdentifier(parameter.name)
    ? `'${parameter.name.text}' parameter`
    : `parameter`;
