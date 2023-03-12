#!/usr/bin/env zx
/* eslint-disable no-undef */
/* eslint-disable no-console */

import { generateReadmeMd } from "./src/code-assist-scaffold/README.md.template.mjs";
import { generateCodeAssistCodeAssistJson } from "./src/code-assist-scaffold/src/code-assist.json.template.mjs";
import { generateCodeAssistIndexTs } from "./src/code-assist-scaffold/src/index.ts.template.mjs";
import { generateCodeAssistMatchTs } from "./src/code-assist-scaffold/src/Match.ts.template.mjs";
import { generateCodeAssistMatcherTs } from "./src/code-assist-scaffold/src/Matcher.ts.template.mjs";
import { generateCodeAssistTransformationTs } from "./src/code-assist-scaffold/src/Transformation.ts.template.mjs";
import { convertCodeAssistIdToName } from "./src/convertCodeAssistIdToName.mjs";

const codeAssistId = process.argv[3];

console.log(`Generating scaffolding for code assist '${codeAssistId}'`);

const codeAssistFolder = `code-assist/${codeAssistId}`;
const codeAssistName = convertCodeAssistIdToName(codeAssistId);

await $`mkdir -p "${codeAssistFolder}/src"`;

// generate sources
generateReadmeMd(`${codeAssistFolder}/README.md`, codeAssistId);
generateCodeAssistIndexTs(`${codeAssistFolder}/src/index.ts`, codeAssistId);
generateCodeAssistMatchTs(
  `${codeAssistFolder}/src/${codeAssistName}Match.ts`,
  codeAssistId
);
generateCodeAssistMatcherTs(
  `${codeAssistFolder}/src/${codeAssistName}Matcher.ts`,
  codeAssistId
);
generateCodeAssistTransformationTs(
  `${codeAssistFolder}/src/${codeAssistName}Transformation.ts`,
  codeAssistId
);
generateCodeAssistCodeAssistJson(
  `${codeAssistFolder}/src/code-assist.json`,
  codeAssistId
);

// copy file
await $`mkdir -p "${codeAssistFolder}/test"`;
await $`cp "codegen/artifact/code-assist/test/should do something.js.test.md" ${codeAssistFolder}/test/`;
