const LEADING_WHITESPACE_REGEXP = /^(?<whitespace>[\s]+)/;

export function getLeadingWhitespace(text: string): string {
  return text.match(LEADING_WHITESPACE_REGEXP)?.groups?.whitespace ?? "";
}
