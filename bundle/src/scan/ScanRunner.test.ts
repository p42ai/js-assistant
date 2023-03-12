import { FileStatistics } from "./ScanResult";
import { ScanRunner } from "./ScanRunner";

describe("ScanRunner", () => {
  it("should calculate correct file statistics", async () => {
    const fileContent = `// test
const a = 123;
console.log(a);
`;

    const scanRunner = new ScanRunner(
      [],
      [],
      {
        refactorings: [],
        maxDiffSize: 2000,
        includedPaths: null,
        excludedPaths: [],
        isLoggingEnabled: false,
      },
      {
        getFileSize: () => Promise.resolve(fileContent.length),
        readFile: () => Promise.resolve(fileContent),
        createDiff: () => "",
        processFiles: async (directory, shouldProcessFile, processFile) => {
          await processFile(
            "relativePath/test.js",
            "absolute/relativePath/test.js"
          );
          Promise.resolve();
        },
      }
    );

    // should be 'FileStatistics | undefined' (needed to use any bc of tsc bug??)
    let fileStatistics: any = undefined;
    await scanRunner.runOnDirectory("directory", (result) => {
      if (result.type === "fileStatistics") {
        fileStatistics = result as FileStatistics;
      }
    });

    expect(fileStatistics?.path).toEqual("relativePath/test.js");
    expect(fileStatistics?.linesOfCode).toEqual(4);
  });
});
