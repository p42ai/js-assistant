import * as fs from "node:fs";

export function getSubdirectoryNames(directory) {
  return fs
    .readdirSync(directory, {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}
