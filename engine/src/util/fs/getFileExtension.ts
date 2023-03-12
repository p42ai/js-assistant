const MATCHER = /(?:\.([^.]+))?$/;

export function getFileExtension(filename: string): string | undefined {
  return MATCHER.exec(filename)?.[1];
}
