import { breakIntoLines } from "../text/breakIntoLines";
import {
  DocumentationCommentContent,
  DocumentationCommentParam,
  DocumentationCommentReturns,
} from "./DocumentationCommentContent";

// 73 = 80 (a standard max column width) - 1 indent of 4 spaces - " * " text
const BASE_MAX_LINE_LENGTH = 73;

const calculateReturnsMaxFirstLineLength = (
  returns: DocumentationCommentReturns
): number =>
  BASE_MAX_LINE_LENGTH -
  "@returns ".length -
  (returns.type != null ? returns.type.length + "{} ".length : 0);

const calculateParamMaxFirstLineLength = (
  param: DocumentationCommentParam
): number =>
  BASE_MAX_LINE_LENGTH -
  "@param ".length -
  (param.type != null ? param.type.length + "{} ".length : 0) -
  param.name.length -
  " - ".length;

const escapeCloseCurlyBraces = (text: string): string =>
  text.replace("}", "\\}");

const typeSection = (tabStop: (text: string) => string, type: string | null) =>
  type != null ? `{${tabStop(type)}} ` : "";

const returnsSection = (
  tabStop: (text: string, maxFirstLineLength?: number) => string,
  returns: DocumentationCommentReturns | null
): string =>
  returns == null
    ? ""
    : `
 *
 * @returns ${typeSection(tabStop, returns.type)}${tabStop(
        returns.description,
        calculateReturnsMaxFirstLineLength(returns)
      )}`;

const paramSection = (
  tabStop: (text: string, maxFirstLineLength?: number) => string,
  param: DocumentationCommentParam
): string =>
  `
 * @param ${typeSection(tabStop, param.type)}${param.name} - ${tabStop(
    param.description,
    calculateParamMaxFirstLineLength(param)
  )}`;

const paramsSection = (
  tabStop: (text: string, maxFirstLineLength?: number) => string,
  content: DocumentationCommentContent
): string =>
  content.params == null
    ? ""
    : `
 *${content.params.map((param) => paramSection(tabStop, param)).join("")}`;

export function createDocumentationCommentSnippet(
  content: DocumentationCommentContent
): string {
  let tabStopCounter = 1;

  const tabStop = (text: string, maxFirstLineLength?: number) =>
    `\${${tabStopCounter++}:${escapeCloseCurlyBraces(
      breakIntoLines({
        text,
        maxLineLength: BASE_MAX_LINE_LENGTH,
        maxFirstLineLength,
      }).join("\n * ")
    )}}`;

  return `/**
 * ${tabStop(content.description)}${paramsSection(
    tabStop,
    content
  )}${returnsSection(tabStop, content.returns)}
 */
`;
}
