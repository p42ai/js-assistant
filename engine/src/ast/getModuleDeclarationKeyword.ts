import ts from "typescript";
import { Flags } from "../util/Flags";

export function getModuleDeclarationKeyword(
  moduleDeclaration: ts.ModuleDeclaration
): ts.SyntaxKind.NamespaceKeyword | ts.SyntaxKind.ModuleKeyword {
  return Flags.isSet(moduleDeclaration.flags, ts.NodeFlags.Namespace)
    ? ts.SyntaxKind.NamespaceKeyword
    : ts.SyntaxKind.ModuleKeyword;
}
