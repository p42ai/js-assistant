
import {
  isConstantExpression,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { MoveConstToOuterScopeMatch } from "./MoveConstToOuterScopeMatch";

const { ast } = m;

export class MoveConstToOuterScopeMatcher extends PatternMatcher<MoveConstToOuterScopeMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableDeclaration],
  };

  constructor() {
    super(MoveConstToOuterScopeMatch);
  }

  createPattern() {
    const captures = {};

    return {
      match: ast.variableDeclaration({
        name: ast.identifier({
          binding: ast.binding({
            writeReferences: (writeReferences) => writeReferences.length === 1,
          }),
        }),
        initializer: p.isDefined(isConstantExpression),
        parent: ast.variableDeclarationList({
          parent: ast.variableStatement(),
        }),
      }),
      captures,
    };
  }

  verifyMatch(match: MoveConstToOuterScopeMatch): boolean {
    let scope = match.context.getScope(match.node);

    // don't match if already on top-level
    if (scope.isTopLevelScope()) {
      return false;
    }

    scope = scope.parent!;

    // go up to top-level scope and check for shadowing
    const { variableName } = match;
    while (!scope.isTopLevelScope()) {
      if (scope.hasBinding(variableName)) {
        return false;
      }

      scope = scope.parent!;
    }

    // check for conflicts on top-level:
    return !scope.hasBinding(variableName);
  }
}
