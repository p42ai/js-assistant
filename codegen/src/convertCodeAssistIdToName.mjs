export function convertCodeAssistIdToName(codeAssistId) {
  let name = "";
  let shouldUppercase = true;

  for (let i = 0; i < codeAssistId.length; i++) {
    const c = codeAssistId.charAt(i);

    if (c !== "-") {
      name += shouldUppercase ? c.toUpperCase() : c;
    }

    shouldUppercase = c === "-";
  }

  return name;
}
