
import { Class, Context, Match } from "@p42/engine";
import ts from "typescript";

type ConvertEsPrivateToTypescriptPrivateNode =
  | ts.PropertyDeclaration
  | ts.MethodDeclaration;
type ConvertEsPrivateToTypescriptPrivateCaptures = {
  identifier: ts.PrivateIdentifier;
};
type ConvertEsPrivateToTypescriptPrivateData = undefined;

export class ConvertEsPrivateToTypescriptPrivateMatch
  implements
    Match<
      ConvertEsPrivateToTypescriptPrivateNode,
      ConvertEsPrivateToTypescriptPrivateCaptures,
      ConvertEsPrivateToTypescriptPrivateData
    >
{
  constructor(
    readonly node: ConvertEsPrivateToTypescriptPrivateNode,
    readonly captures: ConvertEsPrivateToTypescriptPrivateCaptures,
    readonly data: ConvertEsPrivateToTypescriptPrivateData,
    readonly context: Context
  ) {}

  get targetName() {
    return this.captures.identifier.text.substring(1);
  }

  get parentClass() {
    // can assume class-like, because # cannot be used on object literals:
    return this.node.parent as ts.ClassLikeDeclaration;
  }

  getReferences() {
    return Class.findLocalPropertyReferences({
      propertyName: this.captures.identifier.text,
      isEcmaScriptPrivate: true,
      classNode: this.parentClass,
      context: this.context,
    });
  }
}
