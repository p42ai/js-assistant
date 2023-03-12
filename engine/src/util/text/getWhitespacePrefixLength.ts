export function getWhitespacePrefixLength(text: string): number {
  return text.length - text.trimLeft().length;
}
