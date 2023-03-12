export function escapeChar(ch: string, input: string): string {
  if (ch.length !== 1) {
    throw `${ch} must be of length 1`;
  }

  const regexp = new RegExp(`^(\\\\\\\\)*${ch}|([^\\\\])(\\\\\\\\)*${ch}`, "g");

  // Run the regexp twice, because overlapping matches are not being transformed.
  // (lookbehind would be an alternative, but it is not supported in Safari 14).
  return input
    .replace(regexp, `$1$2$3\\${ch}`)
    .replace(regexp, `$1$2$3\\${ch}`);
}

export function unescapeChar(ch: string, input: string): string {
  if (ch.length !== 1) {
    throw `${ch} must be of length 1`;
  }

  const regexp = new RegExp(
    `^\\\\(\\\\\\\\)*${ch}|([^\\\\])\\\\(\\\\\\\\)*${ch}`,
    "g"
  );
  return input.replace(regexp, `$1$2$3${ch}`);
}
