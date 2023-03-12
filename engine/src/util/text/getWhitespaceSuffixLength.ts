export function getWhitespaceSuffixLength(text: string): number {
  return text.length - text.trimRight().length;
}
