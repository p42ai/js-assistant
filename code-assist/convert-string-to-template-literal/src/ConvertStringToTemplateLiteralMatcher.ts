import { matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ConvertStringToTemplateLiteralCandidate } from "./ConvertStringToTemplateLiteralCandidate";

const { ast } = m;

export class ConvertStringToTemplateLiteralMatcher extends PatternMatcher<ConvertStringToTemplateLiteralCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.StringLiteral],
  };

  createPattern() {
    const captures = {};

    return {
      match: ast.stringLiteral({
        constraints: [
          (value, context) => {
            const { parent } = value;
            return (
              !ts.isJsxAttribute(parent) &&
              !ts.isModuleDeclaration(parent) &&
              !ts.isAssertEntry(parent) &&
              !ts.isExportDeclaration(parent)
            );
          },
        ],
      }),
      captures,
    };
  }
}
