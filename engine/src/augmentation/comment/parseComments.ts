import { Range } from "../../util/text/Range";
import { CommentSet } from "./CommentSet";

const IS_ESCAPED = 0b0000_0001;

const IS_INSIDE_SINGLE_LINE_COMMENT = 0b0000_0010;
const IS_INSIDE_MULTI_LINE_COMMENT = 0b0000_0100;

const IS_INSIDE_DOUBLE_QUOTES = 0b0000_1000;
const IS_INSIDE_SINGLE_QUOTES = 0b0001_0000;
const IS_INSIDE_TEMPLATE = 0b0010_0000;

const IS_INSIDE_TEXT =
  IS_INSIDE_DOUBLE_QUOTES | IS_INSIDE_SINGLE_QUOTES | IS_INSIDE_TEMPLATE;

const IS_INSIDE_COMMENT =
  IS_INSIDE_SINGLE_LINE_COMMENT | IS_INSIDE_MULTI_LINE_COMMENT;

const CANNOT_CHANGE_DOUBLE_QUOTES =
  IS_ESCAPED | IS_INSIDE_SINGLE_QUOTES | IS_INSIDE_TEMPLATE | IS_INSIDE_COMMENT;

const CANNOT_CHANGE_SINGLE_QUOTES =
  IS_ESCAPED | IS_INSIDE_DOUBLE_QUOTES | IS_INSIDE_TEMPLATE | IS_INSIDE_COMMENT;

const CANNOT_CHANGE_TEMPLATE =
  IS_ESCAPED |
  IS_INSIDE_SINGLE_QUOTES |
  IS_INSIDE_DOUBLE_QUOTES |
  IS_INSIDE_COMMENT;

const CANNOT_CHANGE_MULTILINE = IS_INSIDE_TEXT | IS_INSIDE_COMMENT;

export function parseComments(sourceText: string): CommentSet {
  let state = 0b000_0000;

  let previousCharacter: string | undefined;
  let previousPosition: number | undefined;

  let commentStart: number | undefined;

  const comments = new Array<Range>();
  for (let position = 0; position < sourceText.length; position++) {
    const currentCharacter = sourceText[position];

    switch (currentCharacter) {
      case '"':
        if ((state & CANNOT_CHANGE_DOUBLE_QUOTES) === 0) {
          state ^= IS_INSIDE_DOUBLE_QUOTES;
        }
        break;
      case "'":
        if ((state & CANNOT_CHANGE_SINGLE_QUOTES) === 0) {
          state ^= IS_INSIDE_SINGLE_QUOTES;
        }
        break;
      case "`":
        if ((state & CANNOT_CHANGE_TEMPLATE) === 0) {
          state ^= IS_INSIDE_TEMPLATE;
        }
        break;
      case "/": {
        if ((state & IS_INSIDE_TEXT) === 0) {
          switch (previousCharacter) {
            case "/":
              if ((state & IS_INSIDE_COMMENT) === 0) {
                state |= IS_INSIDE_SINGLE_LINE_COMMENT;
                commentStart = previousPosition!;
              }
              break;
            case "*":
              if ((state & IS_INSIDE_MULTI_LINE_COMMENT) > 0) {
                comments.push(new Range(commentStart!, position + 1));
                state &= ~IS_INSIDE_MULTI_LINE_COMMENT;
              }
          }
        }
        break;
      }
      case "*":
        if (
          (state & CANNOT_CHANGE_MULTILINE) === 0 &&
          previousCharacter === "/"
        ) {
          state |= IS_INSIDE_MULTI_LINE_COMMENT;
          commentStart = previousPosition!;
        }
        break;
      case "\n": {
        if ((state & IS_INSIDE_SINGLE_LINE_COMMENT) > 0) {
          comments.push(new Range(commentStart!, position));
          state &= ~IS_INSIDE_SINGLE_LINE_COMMENT;
        }
      }
    }

    previousPosition = position;
    previousCharacter = currentCharacter;

    if (currentCharacter === "\\") {
      state ^= IS_ESCAPED;
    } else {
      state &= ~IS_ESCAPED;
    }
  }

  if ((state & IS_INSIDE_SINGLE_LINE_COMMENT) > 0) {
    comments.push(new Range(commentStart!, sourceText.length));
  }

  return new CommentSet(comments);
}
