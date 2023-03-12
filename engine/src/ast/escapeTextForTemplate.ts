import { escapeChar } from "../util/text/escapeChar";

/**
 * Insert an additional backslash for escaping when there's an even number of backslashes
 * preceding backtick, and escape potential template sequence '${'.
 */
export const escapeTextForTemplate = (text: string) =>
  escapeChar("`", text.replace(/\${/g, "\\${"));
