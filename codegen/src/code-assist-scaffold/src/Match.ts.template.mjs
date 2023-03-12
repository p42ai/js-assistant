import * as fs from "fs";
import { convertCodeAssistIdToName } from "../../convertCodeAssistIdToName.mjs";

export function generateCodeAssistMatchTs(filename, codeAssistId) {
  const codeAssistName = convertCodeAssistIdToName(codeAssistId);

  fs.writeFileSync(
    filename,
    `
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type ${codeAssistName}Node = ts.Node;
type ${codeAssistName}Captures = Record<string, never>;
type ${codeAssistName}Data = undefined;

export class ${codeAssistName}Match
  implements Match<
    ${codeAssistName}Node,
    ${codeAssistName}Captures,
    ${codeAssistName}Data
  >
{
  constructor(
    readonly node: ${codeAssistName}Node,
    readonly captures: ${codeAssistName}Captures,
    readonly data: ${codeAssistName}Data,
    readonly context: Context
  ) {}
}
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
