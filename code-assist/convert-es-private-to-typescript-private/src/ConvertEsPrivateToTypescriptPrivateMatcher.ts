
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertEsPrivateToTypescriptPrivateMatch } from "./ConvertEsPrivateToTypescriptPrivateMatch";

const { ast } = m;

export class ConvertEsPrivateToTypescriptPrivateMatcher extends PatternMatcher<ConvertEsPrivateToTypescriptPrivateMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.PropertyDeclaration, ts.SyntaxKind.MethodDeclaration],
  };

  constructor() {
    super(ConvertEsPrivateToTypescriptPrivateMatch);
  }

  createPattern() {
    const captures = {
      identifier: capture.node<ts.PrivateIdentifier>(),
    };

    const capturePrivateNameIdentifier = ast.privateIdentifier({
      constraints: [captures.identifier.record()],
    });

    return {
      match: p.or(
        ast.propertyDeclaration({
          name: capturePrivateNameIdentifier,
        }),
        ast.methodDeclaration({
          name: capturePrivateNameIdentifier,
        })
      ),
      captures,
    };
  }

  verifyMatch(match: ConvertEsPrivateToTypescriptPrivateMatch): boolean {
    return match.parentClass.members.every(
      (member) =>
        member.name == null ||
        !ts.isIdentifier(member.name) ||
        member.name.getText() !== match.targetName
    );
  }
}
