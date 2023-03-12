// see https://mathiasbynens.be/notes/javascript-escapes
export const octalEscapeSequence = "\\\\(?:[1-7][0-7]{0,2}|[0-7]{2,3})";
export const hexadecimalEscapeSequence = "\\\\x[a-fA-F0-9]{2}";
export const unicodeEscapeSequence = "\\\\u[a-fA-F0-9]{4}.";
export const unicodeCodePointEscape = "\\\\u\\{([0-9a-fA-F]{1,})\\}";
