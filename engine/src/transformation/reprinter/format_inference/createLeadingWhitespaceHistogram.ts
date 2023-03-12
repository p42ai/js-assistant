import { getLeadingWhitespace } from "./getLeadingWhitespace";

export function createLeadingWhitespaceHistogram(
  lines: string[]
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const line of lines) {
    const leadingWhitespace = getLeadingWhitespace(line);

    if (result[leadingWhitespace] == null) {
      result[leadingWhitespace] = 1;
    } else {
      result[leadingWhitespace]++;
    }
  }
  return result;
}
