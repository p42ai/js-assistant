import * as fs from "fs";
import { convertCodeAssistIdToName } from "../../convertCodeAssistIdToName.mjs";

export function generateCodeAssistIndexTs(filename, codeAssistId) {
  const codeAssistName = convertCodeAssistIdToName(codeAssistId);

  fs.writeFileSync(
    filename,
    `
import {
  CodeAssistMetadata,
  CodeAssistType,
} from "@p42/engine";
import { ${codeAssistName}Match } from "./${codeAssistName}Match";
import { ${codeAssistName}Matcher } from "./${codeAssistName}Matcher";
import { ${codeAssistName}Transformation } from "./${codeAssistName}Transformation";
import metadata from "./code-assist.json";

export default class ${codeAssistName}CodeAssist extends CodeAssistType<${codeAssistName}Match> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ${codeAssistName}Matcher(),
      [new ${codeAssistName}Transformation()]
    );
  }
}
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
