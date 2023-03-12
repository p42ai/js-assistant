import { Range } from "../../util/text/Range";
import { Edit } from "./Edit";

/**
 * Removes prefix/suffix text from the edit if it does not change the original.
 * When the edit is fully redundant, `undefined` is returned.
 */
export const minimizeEdit = (
  edit: Edit,
  originalText: string
): Edit | undefined => {
  let { range, replacement } = edit;

  let textToBeReplaced = originalText.substring(range.start, range.end);

  let sharedPrefixLength = 0;
  while (
    sharedPrefixLength < textToBeReplaced.length &&
    sharedPrefixLength < replacement.length &&
    textToBeReplaced[sharedPrefixLength] === replacement[sharedPrefixLength]
  ) {
    sharedPrefixLength++;
  }

  if (sharedPrefixLength > 0) {
    range = new Range(range.start + sharedPrefixLength, range.end);
    textToBeReplaced = textToBeReplaced.substring(sharedPrefixLength);
    replacement = replacement.substring(sharedPrefixLength);
  }

  if (replacement === "" && range.isPosition()) {
    return undefined;
  }

  let shareSuffixLength = 0;
  while (
    shareSuffixLength < textToBeReplaced.length &&
    shareSuffixLength < replacement.length &&
    textToBeReplaced[textToBeReplaced.length - 1 - shareSuffixLength] ===
      replacement[replacement.length - 1 - shareSuffixLength]
  ) {
    shareSuffixLength++;
  }

  if (shareSuffixLength > 0) {
    range = new Range(range.start, range.end - shareSuffixLength);
    replacement = replacement.substring(
      0,
      replacement.length - shareSuffixLength
    );
  }

  return range !== edit.range ? new Edit(range, replacement) : edit;
};
