
import { Context, Match } from "@p42/engine";
import ts from "typescript";

export type MoveFieldInitializerIntoDeclarationMatchType = Match<
  ts.ExpressionStatement,
  {
    fieldName: ts.Identifier | ts.PrivateIdentifier;
    initializationExpression: ts.Expression;
    propertyDeclaration: ts.PropertyDeclaration;
  },
  undefined
>;

export class MoveFieldInitializerIntoDeclarationMatch
  implements MoveFieldInitializerIntoDeclarationMatchType
{
  constructor(
    readonly node: MoveFieldInitializerIntoDeclarationMatchType["node"],
    readonly captures: MoveFieldInitializerIntoDeclarationMatchType["captures"],
    readonly data: MoveFieldInitializerIntoDeclarationMatchType["data"],
    readonly context: Context
  ) {}
}
