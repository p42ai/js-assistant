export const convertFirstCharacterToLowerCase = (text: string) =>
  text.length === 0 ? text : text.charAt(0).toLowerCase() + text.slice(1);
