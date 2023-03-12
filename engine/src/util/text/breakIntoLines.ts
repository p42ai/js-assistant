/**
 * Break a text into lines respecting the words.
 */
export function breakIntoLines({
  text,
  maxLineLength,
  maxFirstLineLength = maxLineLength,
}: {
  text: string;
  maxLineLength: number;
  maxFirstLineLength?: number | undefined;
}): string[] {
  const words = text.split(" ").filter((word) => word !== "");

  if (words.length === 0) {
    return [];
  }

  const lines = [];
  let isFirstLine = true;

  let line = words[0];

  for (const word of words.slice(1)) {
    if (
      word.length + line.length + 1 <=
      (isFirstLine ? maxFirstLineLength : maxLineLength)
    ) {
      line += ` ${word}`;
    } else {
      lines.push(line);
      isFirstLine = false;
      line = word;
    }
  }

  lines.push(line);

  return lines;
}
