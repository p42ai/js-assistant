import * as fs from "fs";

export function generateTsconfigJson(filename, codeActionIds) {
  function generateCodeAssistEntries() {
    let content = "";
    for (const codeAssistId of codeActionIds) {
      content += `      "@p42/code-assist-${codeAssistId}": ["code-assist/${codeAssistId}/src/*"],
`;
    }
    return content;
  }

  fs.writeFileSync(
    filename,
    `{
  "compilerOptions": {
    "target": "ES2020",
    "types": ["node", "jest"],
    "jsx": "react",
    "baseUrl": "./",
    "paths": {

${generateCodeAssistEntries()}
      "@p42/app-vscode-shared": ["app/vscode-refactor/shared/src/*"],
      "@p42/app-web": ["app/web/src/*", "app/web/test/*"],
      "@p42/ml": ["ml/src/*"],
      "@p42/bundle": ["bundle/src/*"],
      "@p42/engine": ["engine/src/*"],
      "@p42/service-graphql-engine": ["service/graphql-engine/*"]
    }
  }
}
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
