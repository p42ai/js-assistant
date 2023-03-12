import * as _ from "lodash";

const irregularCases = new Map<string, string>();
irregularCases.set("children", "child");
irregularCases.set("analyses", "analysis");
irregularCases.set("men", "man");
irregularCases.set("women", "woman");
irregularCases.set("wives", "wife");
irregularCases.set("feet", "foot");
irregularCases.set("people", "person");
irregularCases.set("data", "data element"); // datum is too sophisticated and not great for programming

// See https://www.grammarly.com/blog/plural-nouns/
export function convertToSingular({
  pluralWord,
  noSpaces = false,
}: {
  pluralWord: string;
  noSpaces?: boolean | undefined;
}): string | undefined {
  const singularWord = irregularCases.has(pluralWord)
    ? irregularCases.get(pluralWord)
    : guessSingularUsingEnding(pluralWord);

  if (singularWord == null || singularWord.length <= 2) {
    return undefined;
  }

  return noSpaces ? _.camelCase(singularWord) : singularWord;
}

const guessSingularUsingEnding = (pluralWord: string): string | undefined => {
  if (pluralWord.endsWith("ies")) {
    return `${pluralWord.substring(0, pluralWord.length - 3)}y`;
  }

  if (
    pluralWord.endsWith("oes") ||
    pluralWord.endsWith("ses") ||
    pluralWord.endsWith("shes") ||
    pluralWord.endsWith("ches") ||
    pluralWord.endsWith("xes") ||
    pluralWord.endsWith("zes")
  ) {
    return pluralWord.substring(0, pluralWord.length - 2);
  }

  if (pluralWord.endsWith("a")) {
    return `${pluralWord.substring(0, pluralWord.length - 1)}on`;
  }

  if (pluralWord.endsWith("s")) {
    return pluralWord.substring(0, pluralWord.length - 1);
  }

  return undefined;
};
