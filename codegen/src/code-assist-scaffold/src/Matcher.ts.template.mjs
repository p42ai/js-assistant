import * as fs from "fs";
import { convertCodeAssistIdToName } from "../../convertCodeAssistIdToName.mjs";

export function generateCodeAssistMatcherTs(filename, codeAssistId) {
  const codeAssistName = convertCodeAssistIdToName(codeAssistId);

  fs.writeFileSync(
    filename,
    `
import {
  Augmentation,
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ${codeAssistName}Match } from "./${codeAssistName}Match";

const { ast, type, path } = m;

export class ${codeAssistName}Matcher extends PatternMatcher<${codeAssistName}Match> {
  // candidates = {
  //   nodes: [ts.SyntaxKind.TODO],
  // };

  constructor() {
    super(${codeAssistName}Match);
  }

  createPattern() {
    const captures = {
    };

    return {
      match: p.any,
      captures,
    };
  }

  deriveMatchData(
    matchedNode: ${codeAssistName}Match["node"],
    captures: ${codeAssistName}Match["captures"],
    context: Context
  ): ${codeAssistName}Match["data"] {
    return undefined;
  }
}
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
