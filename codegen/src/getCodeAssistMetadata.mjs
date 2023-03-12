import * as fs from "fs";

// read code action ids from code action directory
// (each code action is in a folder with its id as name)
export function getCodeAssistMetadata(codeAssistDirectory, codeAssistIds) {
  const codeAssistMetadata = [];
  for (const codeAssistId of codeAssistIds) {
    codeAssistMetadata.push(
      JSON.parse(
        fs.readFileSync(
          `${codeAssistDirectory}/${codeAssistId}/src/code-assist.json`,
          "utf8"
        )
      )
    );
  }
  return codeAssistMetadata;
}
