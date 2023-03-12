
import { Class, Context, Match, Range } from "@p42/engine";
import ts from "typescript";

type ConvertTypescriptPrivateToEsPrivateNode =
  | ts.PropertyDeclaration
  | ts.MethodDeclaration;
type ConvertTypescriptPrivateToEsPrivateCaptures = {
  identifier: ts.Identifier;
  privateKeyword: ts.PrivateKeyword;
};
type ConvertTypescriptPrivateToEsPrivateData = undefined;

export class ConvertTypescriptPrivateToEsPrivateMatch
  implements
    Match<
      ConvertTypescriptPrivateToEsPrivateNode,
      ConvertTypescriptPrivateToEsPrivateCaptures,
      ConvertTypescriptPrivateToEsPrivateData
    >
{
  constructor(
    readonly node: ConvertTypescriptPrivateToEsPrivateNode,
    readonly captures: ConvertTypescriptPrivateToEsPrivateCaptures,
    readonly data: ConvertTypescriptPrivateToEsPrivateData,
    readonly context: Context
  ) {}

  get targetName() {
    return `#${this.captures.identifier.text}`;
  }

  get parentClass() {
    // can assume class-like, because 'private' cannot be set on object literals:
    return this.node.parent as ts.ClassLikeDeclaration;
  }

  get range() {
    return new Range(this.node.getStart(), this.captures.identifier.getEnd());
  }

  getReferences() {
    return Class.findLocalPropertyReferences({
      propertyName: this.captures.identifier.text,
      classNode: this.parentClass,
      context: this.context,
    });
  }
}
