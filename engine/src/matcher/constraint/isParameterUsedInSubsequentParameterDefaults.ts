import ts from "typescript";
import { getBindings } from "../../ast/getBindings";
import { getDeclaredBindings } from "../../ast/getDeclaredBindings";
import { getInitializerExpressions } from "../../ast/getInitializerExpressions";
import { Context } from "../engine/Context";

/**
 * Checks if any of the variables declared in a parameter are used in subsequent
 * parameter declarations (on the same function/method/constructor).
 */
export const isParameterUsedInSubsequentParameterDefaults = (
  parameter: ts.ParameterDeclaration,
  context: Context
) => {
  const { parameters } = parameter.parent;
  const subsequentParameters = parameters.slice(
    parameters.indexOf(parameter) + 1
  );
  const parameterBindings = getDeclaredBindings.forBindingName(
    parameter.name,
    context
  );

  return subsequentParameters.some((subsequentParameter) =>
    getInitializerExpressions(subsequentParameter)
      .map((expression) => getBindings(expression, context))
      .some((initializerBinding) =>
        parameterBindings.some((parameterBinding) =>
          initializerBinding.has(parameterBinding)
        )
      )
  );
};
