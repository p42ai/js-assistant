
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type MoveConstToOuterScopeNode = ts.VariableDeclaration;
type MoveConstToOuterScopeCaptures = Record<string, never>;
type MoveConstToOuterScopeData = undefined;

export class MoveConstToOuterScopeMatch
  implements
    Match<
      MoveConstToOuterScopeNode,
      MoveConstToOuterScopeCaptures,
      MoveConstToOuterScopeData
    >
{
  constructor(
    readonly node: MoveConstToOuterScopeNode,
    readonly captures: MoveConstToOuterScopeCaptures,
    readonly data: MoveConstToOuterScopeData,
    readonly context: Context
  ) {}

  get variableStatement(): ts.VariableStatement {
    return this.node.parent.parent as ts.VariableStatement;
  }

  get variableName(): string {
    return (this.node.name as ts.Identifier).text;
  }
}
