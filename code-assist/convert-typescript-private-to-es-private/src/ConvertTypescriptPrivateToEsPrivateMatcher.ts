
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertTypescriptPrivateToEsPrivateMatch } from "./ConvertTypescriptPrivateToEsPrivateMatch";

const { ast } = m;

export class ConvertTypescriptPrivateToEsPrivateMatcher extends PatternMatcher<ConvertTypescriptPrivateToEsPrivateMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.PropertyDeclaration, ts.SyntaxKind.MethodDeclaration],
  };

  constructor() {
    super(ConvertTypescriptPrivateToEsPrivateMatch);
  }

  createPattern() {
    const captures = {
      identifier: capture.node<ts.Identifier>(),
      privateKeyword: capture.node<ts.PrivateKeyword>(),
    };

    const hasPrivateModifier = p.some(
      captures.privateKeyword.record({
        match: ast.privateKeyword,
      })
    );

    const captureNameIdentifier = ast.identifier({
      constraints: [captures.identifier.record()],
    });

    return {
      match: p.or(
        ast.propertyDeclaration({
          modifiers: hasPrivateModifier,
          name: captureNameIdentifier,
        }),
        ast.methodDeclaration({
          modifiers: hasPrivateModifier,
          name: captureNameIdentifier,
        })
      ),
      captures,
    };
  }

  verifyMatch(match: ConvertTypescriptPrivateToEsPrivateMatch): boolean {
    return match.parentClass.members.every(
      (member) =>
        member.name == null ||
        !ts.isPrivateIdentifier(member.name) ||
        member.name.getText() !== match.targetName
    );
  }
}
