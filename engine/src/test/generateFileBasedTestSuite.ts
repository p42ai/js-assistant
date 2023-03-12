import * as fs from "fs";
import * as _ from "lodash";
import { getSubdirectories } from "../util/fs/getSubdirectories";
import { readTextFromFile } from "../util/fs/readTextFromFile";

export type TestSuiteOptions = {
  generateTest: (testCase: string, content: string) => Promise<void>;
  testFileSuffix: string;
};

function getTestCases(
  directory: string,
  options: TestSuiteOptions
): Array<
  | { type: "invalid-file-extension"; filename: string }
  | { type: "test-case"; testCaseName: string }
> {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(
      (directoryEntry) =>
        directoryEntry.isFile() &&
        !directoryEntry.name.startsWith(".") && // exclude hidden files
        !directoryEntry.name.endsWith(".ts") // exclude test start script
    )
    .map((directoryEntry) => {
      const filename = directoryEntry.name;
      if (!filename.endsWith(options.testFileSuffix)) {
        return {
          type: "invalid-file-extension",
          filename,
        };
      }

      const baseName = filename.substring(
        0,
        filename.length - options.testFileSuffix.length
      );
      return {
        type: "test-case",
        testCaseName: baseName.substring(0, baseName.length),
      };
    });
}

export function generateTest(
  directory: string,
  testCase: string,
  options: TestSuiteOptions
) {
  // test cases are ignored when they end with ".disabledSUFFIX"
  if (testCase.endsWith(".disabled")) {
    it.skip(
      `${testCase.substring(
        0,
        testCase.length - ".disabled".length
      )} (disabled)`,
      _.noop
    );
    return;
  }

  it(testCase, async () => {
    await options.generateTest(
      testCase,
      readTextFromFile(`${directory}/${testCase}${options.testFileSuffix}`)
    );
  });
}

function generateTestSuiteForDirectory(
  directory: string,
  options: TestSuiteOptions
) {
  // scan all subdirectories and create test suites recursively
  getSubdirectories(directory).forEach((subDirectory) => {
    describe(subDirectory, () => {
      generateTestSuiteForDirectory(`${directory}/${subDirectory}`, options);
    });
  });

  // scan all test files
  getTestCases(directory, options).forEach((testCase) => {
    switch (testCase.type) {
      case "invalid-file-extension":
        it(`"${testCase.filename}" should have supported test extension`, () => {
          expect(testCase.filename.endsWith(options.testFileSuffix)).toEqual(
            true
          );
        });
        break;
      case "test-case":
        generateTest(directory, testCase.testCaseName, options);
        break;
    }
  });
}

export function generateFileBasedTestSuite(options: TestSuiteOptions) {
  generateTestSuiteForDirectory("test", options);
}
