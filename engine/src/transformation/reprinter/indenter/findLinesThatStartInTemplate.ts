const DEFAULT = 0;
const IN_TEMPLATE = 1;
const IN_SINGLE_QUOTED_STRING = 2;
const IN_DOUBLE_QUOTED_STRING = 3;
const IN_MULTILINE_COMMENT = 4;

export const findLinesThatStartInTemplate = (
  startsInTemplate: boolean,
  lines: Array<string>
): Array<boolean> => {
  const isLineStartInTemplate: Array<boolean> = [];

  let state: number = DEFAULT;
  let templateLevel = startsInTemplate ? 1 : 0; // levels of template nesting

  lineLoop: for (const line of lines) {
    isLineStartInTemplate.push(templateLevel > 0);

    let previousEscaped = false;
    let escaped = false;
    let previousChar: string | undefined = undefined;

    charLoop: for (const char of line) {
      switch (state) {
        case DEFAULT: {
          if (char === "`") {
            templateLevel++;
            state = IN_TEMPLATE;
          } else if (char === "'") {
            state = IN_SINGLE_QUOTED_STRING;
          } else if (char === '"') {
            state = IN_DOUBLE_QUOTED_STRING;
          } else if (previousChar === "/") {
            if (char === "/") {
              // end-of-line comment
              continue lineLoop; // move on to next line
            } else if (char === "*") {
              state = IN_MULTILINE_COMMENT;
            }
          } else if (templateLevel > 0 && char === "}") {
            state = IN_TEMPLATE;
          }
          break;
        }
        case IN_TEMPLATE: {
          if (char === "\\") {
            previousEscaped = escaped;
            escaped = !escaped;
            continue charLoop;
          } else if (char === "`" && !escaped) {
            state = DEFAULT;
            templateLevel--;
          } else if (previousChar === "$" && char === "{" && !previousEscaped) {
            state = DEFAULT;
          }
          break;
        }
        case IN_SINGLE_QUOTED_STRING: {
          if (char === "\\") {
            previousEscaped = escaped;
            escaped = !escaped;
            continue charLoop;
          } else if (char === "'" && !escaped) {
            state = DEFAULT;
          }
          break;
        }
        case IN_DOUBLE_QUOTED_STRING: {
          if (char === "\\") {
            previousEscaped = escaped;
            escaped = !escaped;
            continue charLoop;
          } else if (char === '"' && !escaped) {
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

      previousEscaped = escaped;
      escaped = false;
      previousChar = char;
    }
  }

  return isLineStartInTemplate;
};
