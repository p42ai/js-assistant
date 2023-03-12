import { ReprintContext } from "./ReprintContext";

export interface Separator {
  readonly hasNewline: boolean;
  readonly hasComma: boolean;
  readonly minimalSeparator: string;
  readonly minimalSeparator2: string;
  readonly isEmpty: boolean;
  readonly surroundWithSpace: boolean;

  emit(context: ReprintContext): string;
  emitFirstElementPrefix(context: ReprintContext): string;
  emitLastElementSuffix(context: ReprintContext): string;
  emitTrimmed(context: ReprintContext): string;
}

export class StandardSeparator implements Separator {
  private readonly text: string;
  private readonly trimmedText: string;

  readonly minimalSeparator: string;
  readonly minimalSeparator2: string;
  readonly hasComma: boolean;
  readonly hasNewline = false;
  readonly isEmpty: boolean;

  constructor(
    text: string,
    readonly surroundWithSpace = false,
    minimalSeparator?: string
  ) {
    this.text = text;
    this.trimmedText = text.trim();
    this.minimalSeparator = this.trimmedText;
    this.minimalSeparator2 = minimalSeparator ?? this.trimmedText;
    this.hasComma = text.includes(",");
    this.isEmpty = text === "";
  }

  emit(context: ReprintContext): string {
    return this.text;
  }

  emitFirstElementPrefix() {
    return "";
  }

  emitLastElementSuffix() {
    return "";
  }

  emitTrimmed(context: ReprintContext): string {
    return this.trimmedText;
  }
}

export class NewlineSeparator implements Separator {
  private readonly newlineCharacter: string;
  private readonly singleIndentation: string;
  private readonly prefix: string;

  readonly minimalSeparator: string;
  readonly minimalSeparator2: string;
  readonly hasComma: boolean;
  readonly hasNewline = true;
  readonly isEmpty = false;
  readonly surroundWithSpace = false;

  constructor(
    newlineCharacter: string,
    singleIndentation: string,
    prefix = ""
  ) {
    this.newlineCharacter = newlineCharacter;
    this.singleIndentation = singleIndentation;
    this.prefix = prefix;
    this.minimalSeparator = newlineCharacter;
    this.minimalSeparator2 = newlineCharacter;

    this.hasComma = this.prefix.includes(",");
  }

  #indent(context: ReprintContext): string {
    return this.singleIndentation.repeat(context.indentationLevel);
  }

  emit(context: ReprintContext): string {
    return this.prefix + this.newlineCharacter + this.#indent(context);
  }

  emitFirstElementPrefix(context: ReprintContext) {
    return this.newlineCharacter + this.#indent(context);
  }

  emitLastElementSuffix() {
    return this.prefix + this.newlineCharacter;
  }

  emitTrimmed(context: ReprintContext): string {
    // no trimming for newlines, since they are the separator:
    return this.emit(context);
  }
}
