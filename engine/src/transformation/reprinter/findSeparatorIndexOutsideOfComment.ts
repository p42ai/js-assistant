const DEFAULT = 0;
const IN_END_OF_LINE_COMMENT = 1;
const IN_MULTILINE_COMMENT = 2;

export const findSeparatorIndexOutsideOfComment = (
  text: string,
  separator: string
): number => {
  if (separator.length > 2) {
    throw new Error(`separator '${separator}' must be 0, 1, or 2 characters`);
  }

  if (separator === "") {
    return 0;
  }

  let state: number = DEFAULT;
  let previousChar: string | undefined = undefined;

  const matchChar = separator.length === 1 ? separator : separator[1];
  const previousMatchChar = separator.length === 1 ? undefined : separator[0];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    switch (state) {
      case DEFAULT: {
        if (matchChar === char) {
          if (previousMatchChar == null) {
            return i;
          } else if (previousMatchChar === previousChar) {
            return i - 1;
          }
        } else if (previousChar === "/" && char === "/") {
          state = IN_END_OF_LINE_COMMENT;
        } else if (previousChar === "/" && char === "*") {
          state = IN_MULTILINE_COMMENT;
        }
        break;
      }
      case IN_END_OF_LINE_COMMENT: {
        if (char === "\n") {
          // this return is potentially problematic. was added to satisfy tests:
          if (matchChar === "\n") {
            if (previousMatchChar == null) {
              return i;
            } else if (previousMatchChar === previousChar) {
              return i - 1;
            }
          }
          state = DEFAULT;
        }
        break;
      }
      case IN_MULTILINE_COMMENT: {
        if (previousChar === "*" && char === "/") {
          state = DEFAULT;
        }
        break;
      }
    }

    previousChar = char;
  }

  return -1;
};
