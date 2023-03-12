import * as fs from "fs";

export async function isPathReadable(path: string) {
  try {
    await fs.promises.access(path);
    return true;
  } catch (err) {
    return false;
  }
}
