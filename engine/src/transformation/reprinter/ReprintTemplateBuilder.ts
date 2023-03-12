import ts from "typescript";
import { ChangeIndentationElement } from "./ChangeIndentationElement";
import { ChildNodeListElement } from "./ChildNodeListElement";
import { ChildNodeElement } from "./ChildNodeElement";
import { ChildTokenElement } from "./ChildTokenElement";
import { ChildValueElement } from "./ChildValueElement";
import { Condition, Conditions } from "./Condition";
import { ConditionalElement } from "./ConditionalElement";
import { Element } from "./Element";
import { NewlineElement } from "./NewlineElement";
import { PrintSettings } from "./PrintSettings";
import { ReprintTemplate } from "./ReprintTemplate";
import { ResolvedChildTokenElement } from "./ResolvedChildTokenElement";
import { Separator } from "./Separator";
import { StringLiteralElement } from "./StringLiteralElement";
import { TokenElement } from "./TokenElement";
import {
  WhitespaceElement,
  WhitespaceExtractionMode,
} from "./WhitespaceElement";

enum FactoryKind {
  DEFAULT,
  WHITESPACE,
  CHILD_NODE,
}

export class ReprintTemplateBuilder {
  #printSettings: PrintSettings;

  // for whitespace, a string (or undefined) is used because the factory is resolved later
  elementFactoryItems: Array<
    | {
        kind: FactoryKind.DEFAULT | FactoryKind.CHILD_NODE;
        factory: () => Element;
      }
    | {
        kind: FactoryKind.WHITESPACE;
        whitespace: string | undefined;
        condition: Condition | undefined;
      }
  > = [];

  #lastElementIsWhitespace = false;

  constructor(printSettings: PrintSettings) {
    this.#printSettings = printSettings;
  }

  buildTemplate(): ReprintTemplate {
    // Child node elements take care of their own whitespace. Remove adjacent whitespace elements:
    const elementFactories = this.elementFactoryItems.map((factoryItem, i) => {
      if (factoryItem.kind !== FactoryKind.WHITESPACE) {
        return factoryItem.factory;
      }

      // whitespace: determine if suffix / prefix / full mode
      // note: case where the whitespace is between 2 child nodes is not supported
      let mode: WhitespaceExtractionMode = "full";
      if (this.elementFactoryItems[i - 1].kind === FactoryKind.CHILD_NODE) {
        mode = "suffixWhitespace";
      } else if (
        this.elementFactoryItems[i + 1].kind === FactoryKind.CHILD_NODE
      ) {
        mode = "prefixWhitespace";
      }

      const { condition } = factoryItem;
      const whitespaceFactory = () =>
        new WhitespaceElement(factoryItem.whitespace, mode);

      return condition != null
        ? () => new ConditionalElement(condition, whitespaceFactory())
        : whitespaceFactory;
    });

    return new ReprintTemplate(elementFactories);
  }

  addFactory(
    condition: Condition | undefined,
    factory: () => Element,
    factoryKind: FactoryKind.DEFAULT | FactoryKind.CHILD_NODE
  ) {
    this.elementFactoryItems.push({
      kind: factoryKind,
      factory:
        condition != null
          ? () => new ConditionalElement(condition, factory())
          : factory,
    });
  }

  addWhitespace(
    condition: Condition | undefined,
    defaultWhitespace: string | undefined
  ) {
    this.elementFactoryItems.push({
      kind: FactoryKind.WHITESPACE,
      whitespace: defaultWhitespace,
      condition,
    });
  }

  createElementWithWhitespace(
    factory: () => Element,
    condition: Condition | undefined = undefined,
    factoryKind:
      | FactoryKind.DEFAULT
      | FactoryKind.CHILD_NODE = FactoryKind.DEFAULT
  ) {
    if (this.elementFactoryItems.length > 0 && !this.#lastElementIsWhitespace) {
      this.addWhitespace(condition, undefined);
    }
    this.addFactory(condition, factory, factoryKind);
    this.#lastElementIsWhitespace = false;
    return this;
  }

  token(
    token: ts.TokenSyntaxKind,
    condition: Condition | undefined = undefined
  ) {
    return this.createElementWithWhitespace(
      () => new TokenElement(token),
      condition
    );
  }

  childNode(
    property: string,
    condition: Condition | undefined = undefined,
    checkIndent = false
  ) {
    return this.createElementWithWhitespace(
      () => new ChildNodeElement(property, checkIndent),
      condition,
      FactoryKind.CHILD_NODE
    );
  }

  childNodeArray(
    property: string,
    defaultSeparator: Separator,
    condition: Condition | undefined = undefined,
    supportsTrailingSeparator: boolean | undefined = false
  ) {
    return this.createElementWithWhitespace(
      () =>
        new ChildNodeListElement(
          property,
          defaultSeparator,
          supportsTrailingSeparator
        ),
      condition,
      FactoryKind.CHILD_NODE
    );
  }

  childValue(property: string, condition: Condition | undefined = undefined) {
    return this.createElementWithWhitespace(
      () => new ChildValueElement(property),
      condition
    );
  }

  childToken(property: string, condition: Condition | undefined = undefined) {
    return this.createElementWithWhitespace(
      () => new ChildTokenElement(property),
      condition
    );
  }

  resolvedChildToken<T extends ts.Node>(
    resolver: (node: T) => ts.SyntaxKind | undefined,
    condition: Condition | undefined = undefined
  ) {
    return this.createElementWithWhitespace(
      () => new ResolvedChildTokenElement(resolver),
      condition
    );
  }

  newline(
    condition: Condition | undefined = undefined,
    isFirstBlockLine = false
  ) {
    this.addFactory(
      condition,
      () =>
        new NewlineElement(
          this.#printSettings.newlineSeparator,
          isFirstBlockLine
        ),
      FactoryKind.DEFAULT
    );
    this.#lastElementIsWhitespace = true;
    return this;
  }

  whitespace(
    defaultWhitespace: string,
    condition: Condition | undefined = undefined
  ) {
    this.addWhitespace(condition, defaultWhitespace);
    this.#lastElementIsWhitespace = true;
    return this;
  }

  space(condition: Condition | undefined = undefined) {
    return this.whitespace(" ", condition);
  }

  /**
   * Adds a semicolon token. It's optional when extracting (since they can sometimes
   * be omitted).
   */
  semicolon() {
    this.token(
      ts.SyntaxKind.SemicolonToken,
      Conditions.hasTokenAtPosition(ts.SyntaxKind.SemicolonToken)
    );
    return this;
  }

  modifiers() {
    return this.childNodeArray(
      "modifiers",
      this.#printSettings.spaceSeparator,
      Conditions.hasChild("modifiers")
    );
  }

  typeArguments({
    property = "typeArguments",
    trailingComma = false,
  }: {
    property?: string | undefined;
    trailingComma?: boolean | undefined;
  } = {}) {
    const hasTypeArguments = Conditions.hasChildElements(property);

    this.token(ts.SyntaxKind.LessThanToken, hasTypeArguments);
    this.childNodeArray(
      property,
      this.#printSettings.commaSpaceSeparator,
      Conditions.hasChildElements(property)
    );

    if (trailingComma) {
      this.whitespace(", ", hasTypeArguments);
    }

    this.token(ts.SyntaxKind.GreaterThanToken, hasTypeArguments);

    return this;
  }

  stringLiteral(isSingleQuoteDefault: boolean) {
    this.elementFactoryItems.push({
      kind: FactoryKind.DEFAULT,
      factory: () => new StringLiteralElement(isSingleQuoteDefault),
    });
  }

  increaseIndentation(property: string, amount = 1) {
    this.elementFactoryItems.push({
      kind: FactoryKind.DEFAULT,
      factory: () => new ChangeIndentationElement(property, "increase", amount),
    });
    return this;
  }

  decreaseIndentation(property: string, amount = 1) {
    this.elementFactoryItems.push({
      kind: FactoryKind.DEFAULT,
      factory: () => new ChangeIndentationElement(property, "decrease", amount),
    });
    return this;
  }

  /**
   * Parameter list that carries over original indentation, if any.
   */
  parameterList(property: string) {
    return this.increaseIndentation(property, 0)
      .childNodeArray(property, this.#printSettings.commaSpaceSeparator)
      .decreaseIndentation(property, 0);
  }
}
