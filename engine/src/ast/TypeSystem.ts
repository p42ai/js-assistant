import ts from "typescript";
import { Flags } from "../util/Flags";

function hasAnyTypeFlag(type: ts.Type, flags: ts.TypeFlags): boolean {
  return Flags.isAnySet(type.flags, flags);
}

export class TypeSystem {
  readonly checker: ts.TypeChecker;

  // needed to access internal methods of TypeChecker
  private get anyChecker(): any {
    return this.checker as any;
  }

  constructor(checker: ts.TypeChecker) {
    this.checker = checker;
  }

  getType(node: ts.Node): ts.Type | undefined {
    return this.checker.getTypeAtLocation(node);
  }

  getElementTypeOfArrayType(type: ts.Type): ts.Type {
    return this.anyChecker.getElementTypeOfArrayType(type) as ts.Type;
  }

  isAny(type: ts.Type): boolean {
    return hasAnyTypeFlag(type, ts.TypeFlags.Any);
  }

  isUnknown(type: ts.Type): boolean {
    return hasAnyTypeFlag(type, ts.TypeFlags.Unknown);
  }

  isBoolean(type: ts.Type): boolean {
    return hasAnyTypeFlag(
      type,
      ts.TypeFlags.BooleanLike |
        ts.TypeFlags.BooleanLiteral |
        ts.TypeFlags.Boolean
    );
  }

  isString(type: ts.Type): boolean {
    return hasAnyTypeFlag(
      type,
      ts.TypeFlags.String | ts.TypeFlags.StringLiteral
    );
  }

  isNumeric(type: ts.Type): boolean {
    return hasAnyTypeFlag(
      type,
      ts.TypeFlags.NumberLike | ts.TypeFlags.NumberLiteral | ts.TypeFlags.Number
    );
  }

  canBeNumber(type: ts.Type): boolean {
    return this.isTypeAssignableTo(type, this.getNumberType());
  }

  isArrayType(type: ts.Type, allowNullish = false): boolean {
    if (this.anyChecker.isArrayType(type)) {
      return true;
    }

    return allowNullish
      ? this.anyChecker.isArrayType(type.getNonNullableType())
      : false;
  }

  canBeNullish(type: ts.Type): boolean {
    return this.anyChecker.isNullableType(type);
  }

  isObjectType(type: ts.Type): boolean {
    return hasAnyTypeFlag(type, ts.TypeFlags.Object);
  }

  isTypeAssignableTo(source: ts.Type, target: ts.Type): boolean {
    return this.anyChecker.isTypeAssignableTo(source, target) as boolean;
  }

  getNumberType(): ts.Type {
    return this.anyChecker.getNumberType() as ts.Type;
  }

  asString(type: ts.Type): string {
    return this.anyChecker.typeToString(type) as string;
  }
}
