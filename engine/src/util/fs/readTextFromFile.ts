import fs from "fs";

export function readTextFromFile(filename: string) {
  return fs.readFileSync(filename, { encoding: "utf8", flag: "r" });
}
