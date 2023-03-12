import ts from "typescript";
import { Context } from "../engine/Context";

/**
 * @returns true if the identifier is the declaring node of the binding.
 */
export const isDeclaringIdentifier = (
  identifier: ts.Identifier,
  context: Context
): boolean =>
  context.getBinding(identifier)?.declaringNodes.includes(identifier) ?? false;
