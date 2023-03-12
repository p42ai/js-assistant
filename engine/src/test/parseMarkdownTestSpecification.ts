import { marked } from "marked";

const getSectionName = (codeToken: marked.Tokens.Code): string | undefined => {
  if (codeToken.lang == null) {
    return undefined;
  }

  return codeToken.lang.split(" ").slice(1).join(" ");
};

export const parseMarkdownTestSpecification = (
  content: string,
  sectionNames: string[]
): Map<string, string> => {
  const sectionContents = new Map<string, string>();

  marked
    .lexer(content)
    .filter((token) => token.type === "code")
    .forEach((token) => {
      const codeToken = token as marked.Tokens.Code;

      const sectionName = getSectionName(codeToken);

      if (sectionName == null) {
        return; // ignore unlabeled sections
      }
      if (!sectionNames.includes(sectionName)) {
        throw `unknown section '${sectionName}' (supported: ${sectionNames.join()})`;
      }

      sectionContents.set(sectionName, codeToken.text);
    });

  return sectionContents;
};
