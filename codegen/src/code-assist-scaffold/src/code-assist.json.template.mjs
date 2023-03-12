import * as fs from "fs";
import { convertCodeAssistIdToName } from "../../convertCodeAssistIdToName.mjs";

export function generateCodeAssistCodeAssistJson(filename, codeAssistId) {
  const codeAssistName = convertCodeAssistIdToName(codeAssistId);

  fs.writeFileSync(
    filename,
    `{
  "id": "${codeAssistId}",
  "isEnabled": false,
  "platform": {
    "languages": ["JAVASCRIPT", "TYPESCRIPT"]
  },
  "visualStudioCode": {
    "codeActionKinds": [
      "refactor.${codeAssistId}"
    ]
  },
  "documentation": {
    "title": "TODO ${codeAssistName}",
    "shortDescription": "",
    "categories": ["branching"],
    "relatedCodeAssists": [],
    "references": []
  }
}
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
