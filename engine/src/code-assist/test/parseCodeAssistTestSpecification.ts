import { parseMarkdownTestSpecification } from "../../test/parseMarkdownTestSpecification";
import {
  CodeAssistTestConfiguration,
  CodeAssistTestSpecification,
  ExpectedMatches,
} from "./CodeAssistTestSpecification";

const EXPECTED_CONFIGURATION_KEYS = [
  "extension",
  "transformedNodeId",
  "transformationId",
  "selection",
  "interactiveInput",
  "onlySuggestions",
  "lineEnding",
];

const EXPECTED_MATCH_KEYS = [
  "safety",
  "applicationResult",
  "availableTransformations",
  "blockedZones",
  "suggestion",
  "actionZones",
  "postEditActions",
];

const SECTION_NAMES = [
  "input",
  "expected output",
  "expected matches",
  "configuration",
];

export function parseCodeAssistTestSpecification(
  content: string
): CodeAssistTestSpecification {
  const sectionContents = parseMarkdownTestSpecification(
    content,
    SECTION_NAMES
  );

  // validate input:
  if (!sectionContents.has("input")) {
    throw `no input defined`;
  }

  // if there is a test config section, parse it:
  const configuration =
    sectionContents.get("configuration") != null
      ? (JSON.parse(
          sectionContents.get("configuration")!
        ) as CodeAssistTestConfiguration)
      : undefined;

  if (configuration == null) {
    throw new Error(`must have configuration section`);
  }

  // validate keys in configuration to find typos, old keys etc:
  for (const key of Object.keys(configuration)) {
    if (key === null) {
      continue;
    }

    if (!EXPECTED_CONFIGURATION_KEYS.includes(key)) {
      throw `unknown configuration key '${key}' (supported: ${EXPECTED_CONFIGURATION_KEYS.join(
        ", "
      )})`;
    }
  }

  // if there is an expected matches section, parse it:
  const expectedMatches =
    sectionContents.get("expected matches") != null
      ? (JSON.parse(
          sectionContents.get("expected matches")!
        ) as ExpectedMatches)
      : undefined;

  // validate keys in expected matches to find typos, old keys etc:
  if (expectedMatches != null) {
    for (const match of Object.values(expectedMatches)) {
      if (match === null) {
        continue;
      }

      for (const key of Object.keys(match)) {
        if (!EXPECTED_MATCH_KEYS.includes(key)) {
          throw `unknown expected match key '${key}' (supported: ${EXPECTED_MATCH_KEYS.join(
            ", "
          )})`;
        }
      }
    }
  }

  // line ending transformation
  let input = sectionContents.get("input")!;
  let output = sectionContents.get("expected output");
  if (configuration?.lineEnding === "crlf") {
    // change input/output line ending to \r\n
    input = input.replace(/\n/g, "\r\n");
    output = output?.replace(/\n/g, "\r\n");
  }

  return new CodeAssistTestSpecification(
    input,
    output,
    expectedMatches,
    configuration
  );
}
