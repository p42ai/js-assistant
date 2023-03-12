import * as readline from "readline";
import { AUGMENTATIONS } from "../augmentations";
import { createCodeAssists } from "../codeAssists.generated";
import { ScanConfiguration } from "./ScanConfiguration";
import { ScanResult } from "./ScanResult";
import { ScanRunner } from "./ScanRunner";

const EXIT_CODE_SUCCESS = 0;
const EXIT_CODE_ERROR_UNKNOWN = 1;
const EXIT_CODE_ERROR_INVALID_CONFIGURATION = 2;

async function runTransform({
  directory,
  configuration,
}: {
  directory: string;
  configuration: ScanConfiguration;
}) {
  try {
    const runner = new ScanRunner(
      AUGMENTATIONS,
      createCodeAssists(),
      configuration
    );

    await runner.runOnDirectory(
      directory,
      (result: ScanResult) => console.log(JSON.stringify(result)) // eslint-disable-line no-console
    );

    process.exitCode = EXIT_CODE_SUCCESS; // don't call process.exit() - it terminates stdout/stderr
  } catch (error: any) {
    console.error(error.message);
    process.exitCode = EXIT_CODE_ERROR_UNKNOWN;
  }
}

async function readScanConfiguration(): Promise<ScanConfiguration> {
  const lineReader = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity,
  });

  // for loop only used for generator access, return after parsing 1st line JSON
  // noinspection LoopStatementThatDoesntLoopJS
  for await (const line of lineReader) {
    return JSON.parse(line) as ScanConfiguration;
  }

  // TODO validate scan configuration with JSON schema

  throw "Could not read scan configuration from StdIn";
}

// Capture any unhandled promise rejections:
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Promise Rejection", p, reason);
});

// Extract arguments. arg[0] = node, arg[1] = js file
readScanConfiguration()
  .then((configuration: ScanConfiguration) => {
    if (process.argv[2] == null) {
      console.error("directory not specified");
      process.exitCode = EXIT_CODE_ERROR_INVALID_CONFIGURATION;
      return;
    }
    const directory = process.argv[2];

    return runTransform({
      directory,
      configuration,
    });
  })
  .then()
  .catch((error: any) => {
    console.error(error.message);
    process.exitCode = EXIT_CODE_ERROR_UNKNOWN;
  });
