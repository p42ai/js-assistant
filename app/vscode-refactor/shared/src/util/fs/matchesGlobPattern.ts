import * as minimatch from "minimatch";

export const matchesGlobPattern = (path: string, globPatterns: string[]) =>
  globPatterns.some((excludedPathPattern) =>
    minimatch(path, excludedPathPattern, {
      dot: true,
    })
  );
