import { getWhitespacePrefixLength } from "./getWhitespacePrefixLength";
import { getWhitespaceSuffixLength } from "./getWhitespaceSuffixLength";
import { Range } from "./Range";

export function trimWhitespaceFromSelection(
  fullText: string,
  selection: Range
): Range {
  const text = fullText.substring(selection.start, selection.end);

  return new Range(
    selection.start + getWhitespacePrefixLength(text),
    selection.end - getWhitespaceSuffixLength(text)
  );
}
