/**
 * Checks if the merger of 2 strings would result in a string that matches a regexp on the fused
 * section. This is e.g. useful when detecting if a string merge would result in creating a unicode
 * escape sequence by coincidence.
 */
export function checkMerge(
  regExp: string,
  part1: string,
  part2: string
): boolean {
  const combinedText = part1 + part2;
  const matches = [...(combinedText as any).matchAll(new RegExp(regExp, "g"))];

  for (const match of matches) {
    const start = (match as any).index;
    const midpoint = part1.length;
    const end = start + match[0].length;

    if (start < midpoint && midpoint < end) {
      return false;
    }
  }

  return true;
}
