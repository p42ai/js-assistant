import { getFiles } from "./getFiles";

/**
 * Processes each file in a path that matches a filter. Async processing of single file at a time.
 *
 * @param directory
 *        Path that contains the files that should be processed.
 * @param shouldProcessFile
 *        Filter that matches the filename to determine whether it should be processed
 * @param processFile
 *        Function that processes the file
 */
export async function processFiles(
  directory: string,
  shouldProcessFile: (relativePath: string) => boolean,
  processFile: (relativePath: string, fullPath: string) => Promise<void>
) {
  for await (const file of getFiles(directory)) {
    const relativePath = file.toString().substring(directory.length + 1); // remove the directory path prefix and slash

    if (!shouldProcessFile(relativePath)) {
      continue;
    }

    await processFile(relativePath, file);
  }
}
