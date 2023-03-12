import ts from "typescript";
import { ImportInformation } from "./ImportInformation";
import { isStaticTextLiteral } from "../../../ast/isStaticTextLiteral";

export class DefaultImportInformation implements ImportInformation {
  constructor(readonly importDeclaration: ts.ImportDeclaration) {}

  readonly isDefault = true;
  readonly isNamespace = false;
  readonly isCommonJSRequire = false;
  readonly isESMImport = true;

  get isDynamic() {
    return !this.isStatic;
  }

  get isStatic() {
    return isStaticTextLiteral(this.importDeclaration.moduleSpecifier);
  }

  get staticSource() {
    const { moduleSpecifier } = this.importDeclaration;
    return isStaticTextLiteral(moduleSpecifier)
      ? moduleSpecifier.text
      : undefined;
  }
}
