
import { Match, VariableDeclarationKind } from "@p42/engine";
import ts from "typescript";

export interface MergeIntoPrecedingDestructuringAssignmentCandidate
  extends Match<
    ts.VariableStatement,
    {
      source: ts.Expression;

      previousVariableDeclarationList: ts.VariableDeclarationList;
      variableDeclarationList: ts.VariableDeclarationList;

      previousPattern: ts.ObjectBindingPattern;
      pattern: ts.ObjectBindingPattern;

      previousDeclaration: ts.VariableDeclaration;
      declaration: ts.VariableDeclaration;
    },
    {
      declarationKind: VariableDeclarationKind.VariableDeclarationKind;
      previousDeclarationKind: VariableDeclarationKind.VariableDeclarationKind;
      targetDeclarationKind: VariableDeclarationKind.VariableDeclarationKind;
    }
  > {}
