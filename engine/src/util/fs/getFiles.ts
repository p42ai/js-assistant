import * as path from "path";
import * as fs from "fs";

/*
 * Async iterator over the file names in a directory (recursively). Symlinks are **not** followed.
 *
 * This Node 11+ implementation allows for pulling files one at a time.
 *
 * Source: https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
 */
export async function* getFiles(directory: string): AsyncIterable<string> {
  const directoryEntries = await fs.promises.readdir(directory, {
    withFileTypes: true,
  });
  for (const directoryEntry of directoryEntries) {
    // Only files & directories are followed. Symbolic links, block devices, etc are ignored
    // **Note**: not following symbolic links is a security decision.
    // It prevents breaking out of the directory through the use of symlinks.
    // As an added bonus, it also prevents files from getting analyzed multiple times.
    if (directoryEntry.isDirectory()) {
      yield* getFiles(path.resolve(directory, directoryEntry.name));
    } else if (directoryEntry.isFile()) {
      yield path.resolve(directory, directoryEntry.name);
    }
  }
}
