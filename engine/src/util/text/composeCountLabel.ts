import { convertToSingular } from "./convertToSingular";

export function composeCountLabel(
  count: number,
  pluralWord: string,
  singular: string | undefined = convertToSingular({ pluralWord }) ?? pluralWord
) {
  switch (count) {
    case 0:
      return `no ${pluralWord}`;
    case 1:
      return `1 ${singular}`;
    default:
      return `${count} ${pluralWord}`;
  }
}
