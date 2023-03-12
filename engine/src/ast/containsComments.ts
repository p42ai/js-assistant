import ts from "typescript";

export const containsComments = (block: ts.Block) => {
  // inner comments are not part of trailing/leading ts comments, so use
  // a custom solution

  // TODO replace this ad-hoc solution with something better once comment
  // scanning is implemented
  const text = block.getText().trim();
  const innerText = text.substring(1, text.length - 1); // remove {}
  return innerText.trim() !== "";
};
