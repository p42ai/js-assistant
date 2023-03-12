export function indent(depth: number): (s: string) => string {
  const indent = " ".repeat(depth);
  return (s: string) =>
    s
      .split("\n")
      .map((s2) => (s2 === "" ? "" : `${indent}${s2}`)) // don't indent empty strings
      .join("\n");
}

export function toCamelCase(pascalCaseString: string): string {
  return pascalCaseString.length === 0
    ? pascalCaseString
    : `${pascalCaseString[0].toLowerCase()}${pascalCaseString.slice(1)}`;
}

export function toPascalCase(camelCaseString: string): string {
  return camelCaseString.length === 0
    ? camelCaseString
    : `${camelCaseString[0].toUpperCase()}${camelCaseString.slice(1)}`;
}

export function format(
  content: string[],
  depth: number,
  lineSeparator = "\n"
): string {
  return content.map(indent(depth)).join(lineSeparator);
}
