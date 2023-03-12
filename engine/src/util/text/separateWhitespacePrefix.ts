const prefixRemainderRegexp = /(?<prefix>\s*)(?<remainder>(\S|\s)*)/;

export function separateWhitespacePrefix(text: string): {
  prefix: string;
  remainder: string;
} {
  return prefixRemainderRegexp.exec(text)?.groups as {
    prefix: string;
    remainder: string;
  };
}
