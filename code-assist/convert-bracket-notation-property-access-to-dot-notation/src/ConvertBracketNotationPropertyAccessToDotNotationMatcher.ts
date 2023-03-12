import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ConvertBracketNotationPropertyAccessToDotNotationCandidate } from "./ConvertBracketNotationPropertyAccessToDotNotationCandidate";

const { ast } = m;

// see https://tc39.es/ecma262/#sec-keywords-and-reserved-words for JS keywords and TypeScript handbook for TS keywords
// additional added words: of, undefined,null
const excludedWordRegexp = new RegExp(
  "^" +
    "break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|" +
    "if|import|in|instanceof|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield|" +
    "enum|implements|interface|let|package|private|protected|public|static|await|as|of|null|undefined$"
);

// This regexp for valid identifier names ignores reserved words and is more restrictive than
// all allowed identifier names (which include unicode), but great for quick validation and covering
// cases that *should* be converted.
// For more details, see https://stackoverflow.com/questions/1661197/what-characters-are-valid-for-javascript-variable-names
const validIdentifierNameRegexp = new RegExp("^[a-zA-Z_$][0-9a-zA-Z_$]*$");

export class ConvertBracketNotationPropertyAccessToDotNotationMatcher extends PatternMatcher<ConvertBracketNotationPropertyAccessToDotNotationCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.ElementAccessExpression],
  };

  createPattern() {
    const captures = {
      name: capture.value<string>(),
    };

    return {
      match: ast.elementAccessExpression({
        argumentExpression: ast.stringLiteral({
          text: captures.name.record({
            match: (variableName) =>
              variableName.match(excludedWordRegexp) == null &&
              variableName.match(validIdentifierNameRegexp) != null,
          }),
        }),
      }),
      captures,
    };
  }
}
