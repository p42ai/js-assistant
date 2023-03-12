import * as fs from "fs";

export function generateBundleCodeAssists(filename, codeAssistIds) {
  function getCodeAssistName(codeAssistId) {
    let result = "";
    let shouldUppercase = true;

    for (let i = 0; i < codeAssistId.length; i++) {
      const c = codeAssistId.charAt(i);

      if (c === "-") {
        shouldUppercase = true;
      } else {
        result += shouldUppercase ? c.toUpperCase() : c;
        shouldUppercase = false;
      }
    }

    return `${result}CodeAssist`;
  }

  function generateCodeAssistImports() {
    let content = "";
    for (const codeAssistId of codeAssistIds) {
      content += `import ${getCodeAssistName(
        codeAssistId
      )} from "@p42/code-assist-${codeAssistId}";
`;
    }
    return content;
  }

  function generateCodeAssistList() {
    let content = "";
    for (const id of codeAssistIds) {
      content += `  ${getCodeAssistName(id)},
`;
    }
    return content;
  }

  fs.writeFileSync(
    filename,
    `
${generateCodeAssistImports()}
import { AnyMatch, CodeAssistMetadata, CodeAssistType } from "@p42/engine";

interface CodeAssistClass<T extends AnyMatch> {
  new (): CodeAssistType<T>;
  getMetadata(): CodeAssistMetadata;
}

export const CODE_ASSISTS: Array<CodeAssistClass<any>> = [
${generateCodeAssistList()}
];

const codeAssistClassById: Map<string, CodeAssistClass<any>> = new Map();
for (const codeAssist of CODE_ASSISTS) {
  codeAssistClassById.set(codeAssist.getMetadata().id, codeAssist);
}

export function getCodeAssistClass(id: string): CodeAssistClass<any> | undefined {
  return codeAssistClassById.get(id);
}

export function createCodeAssists(): Array<CodeAssistType<AnyMatch>> {
  return CODE_ASSISTS.map((SpecificCodeAssist) => {
    return new SpecificCodeAssist();
  });
}
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
