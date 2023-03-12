
import { Context, Match } from "@p42/engine";
import ts from "typescript";

export type MoveFieldInitializerIntoConstructorMatchType = Match<
  ts.PropertyDeclaration,
  {
    fieldName: ts.Identifier | ts.PrivateIdentifier;
    constructorBody: ts.Block;
    fieldInitializer: ts.Expression;
  },
  undefined
>;

export class MoveFieldInitializerIntoConstructorMatch
  implements MoveFieldInitializerIntoConstructorMatchType
{
  constructor(
    readonly node: MoveFieldInitializerIntoConstructorMatchType["node"],
    readonly captures: MoveFieldInitializerIntoConstructorMatchType["captures"],
    readonly data: MoveFieldInitializerIntoConstructorMatchType["data"],
    readonly context: Context
  ) {}
}
