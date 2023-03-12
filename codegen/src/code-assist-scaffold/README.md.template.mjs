import * as fs from "fs";
import { convertCodeAssistIdToName } from "../convertCodeAssistIdToName.mjs";

export function generateReadmeMd(filename, codeAssistId) {
  const codeAssistName = convertCodeAssistIdToName(codeAssistId);

  fs.writeFileSync(
    filename,
    `# ${codeAssistName}

## TODOs

* Implement matching and transformation
* Add safety check
* Configure action zones
* Add collision check
* (Optional) add suggestions
  * Add to P42ObjectModel
* Update .json configuration
* Add documentation
* Record screencast
* Update code assist counts
* Update changelog

## Improvements

## Known Bugs
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
