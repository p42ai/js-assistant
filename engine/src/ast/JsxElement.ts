import ts from "typescript";

export const JsxElement = Object.freeze({
  isTagName(node: ts.JsxTagNameExpression) {
    const { parent } = node;
    return (
      (ts.isJsxOpeningElement(parent) ||
        ts.isJsxClosingElement(parent) ||
        ts.isJsxSelfClosingElement(parent)) &&
      parent.tagName === node
    );
  },

  getTagName(
    node: ts.JsxElement | ts.JsxSelfClosingElement | ts.JsxFragment
  ): string | undefined {
    if (ts.isJsxFragment(node)) {
      return undefined;
    }

    const { tagName } = ts.isJsxElement(node) ? node.openingElement : node;

    // TODO support this, properties access, generics
    return ts.isIdentifier(tagName) ? tagName.text : undefined;
  },
});
