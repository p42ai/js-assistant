import { escapeChar, unescapeChar } from "./escapeChar";

function verifyEscapeCharReturnsExpected(
  ch: string,
  input: string,
  expected: string
) {
  it(`${ch}, ${input} ➡️ ${expected}`, () => {
    expect(escapeChar(ch, input)).toEqual(expected);
  });
}

function verifyEscapeCharThrowsError(ch: string, input: string) {
  it(`${ch}, ${input} ➡️ throws error`, () => {
    expect(() => {
      escapeChar(ch, input);
    }).toThrow();
  });
}

function verifyUnescapeCharReturnsExpected(
  ch: string,
  input: string,
  expected: string
) {
  it(`${ch}, ${input} ➡️ ${expected}`, () => {
    expect(unescapeChar(ch, input)).toEqual(expected);
  });
}

function verifyUnescapeCharThrowsError(ch: string, input: string) {
  it(`${ch}, ${input} ➡️ throws error`, () => {
    expect(() => {
      unescapeChar(ch, input);
    }).toThrow();
  });
}

describe("escapeChar", () => {
  describe("should not escape character if it's already escaped", () => {
    verifyEscapeCharReturnsExpected("'", "\\\\\\'", "\\\\\\'");
    verifyEscapeCharReturnsExpected("'", "\\'", "\\'");
    verifyEscapeCharReturnsExpected("'", "a\\\\\\'", "a\\\\\\'");
    verifyEscapeCharReturnsExpected("'", "a\\'", "a\\'");
    verifyEscapeCharReturnsExpected('"', '\\\\\\"', '\\\\\\"');
    verifyEscapeCharReturnsExpected('"', '\\"', '\\"');
  });

  describe("should escape character if it's not escaped yet", () => {
    verifyEscapeCharReturnsExpected("'", "'", "\\'");
    verifyEscapeCharReturnsExpected("'", "abc'", "abc\\'");
    verifyEscapeCharReturnsExpected("'", "\\\\'", "\\\\\\'");
    verifyEscapeCharReturnsExpected("'", "abc\\\\'", "abc\\\\\\'");
    verifyEscapeCharReturnsExpected('"', '"', '\\"');
    verifyEscapeCharReturnsExpected('"', 'abc"', 'abc\\"');
    verifyEscapeCharReturnsExpected("`", "x``x", "x\\`\\`x");
    verifyEscapeCharReturnsExpected("`", "x```x", "x\\`\\`\\`x");
  });

  describe("should escape correctly in mixed sequence with already escaped characters", () => {
    verifyEscapeCharReturnsExpected("'", "abc'de\\'fg'h", "abc\\'de\\'fg\\'h");
    verifyEscapeCharReturnsExpected('"', 'abc"de\\"fg"h', 'abc\\"de\\"fg\\"h');
  });

  describe("should throw exception when ch has not exactly one character", () => {
    verifyEscapeCharThrowsError("", "test");
    verifyEscapeCharThrowsError("abc", "test");
    verifyEscapeCharThrowsError('""', "test");
    verifyEscapeCharThrowsError('\\"', "test");
  });
});

describe("unescapeChar", () => {
  describe("should not unescape character if it's not escaped", () => {
    verifyUnescapeCharReturnsExpected("'", "'", "'");
    verifyUnescapeCharReturnsExpected("'", "\\\\'", "\\\\'");
    verifyUnescapeCharReturnsExpected('"', '\\\\"', '\\\\"');
    verifyUnescapeCharReturnsExpected('"', '"', '"');
  });

  describe("should unescape character if it's escaped", () => {
    verifyUnescapeCharReturnsExpected("'", "\\'", "'");
    verifyUnescapeCharReturnsExpected("'", "abc\\'", "abc'");
    verifyUnescapeCharReturnsExpected('"', '\\"', '"');
    verifyUnescapeCharReturnsExpected('"', 'abc\\"', 'abc"');
  });

  describe("should retain unrelated escaped backslashes", () => {
    verifyUnescapeCharReturnsExpected("'", "\\\\\\'", "\\\\'");
    verifyUnescapeCharReturnsExpected('"', '\\\\\\"', '\\\\"');
    verifyUnescapeCharReturnsExpected("'", "a\\\\\\'", "a\\\\'");
    verifyUnescapeCharReturnsExpected('"', 'a\\\\\\"', 'a\\\\"');
  });

  describe("should unescape correctly in mixed sequence with already escaped characters", () => {
    verifyUnescapeCharReturnsExpected(
      "'",
      "abc\\'de\\\\'fg\\'h",
      "abc'de\\\\'fg'h"
    );
    verifyUnescapeCharReturnsExpected(
      '"',
      'abc\\"de\\\\"fg\\"h',
      'abc"de\\\\"fg"h'
    );
  });

  describe("should throw exception when ch has not exactly one character", () => {
    verifyUnescapeCharThrowsError("", "test");
    verifyUnescapeCharThrowsError("abc", "test");
    verifyUnescapeCharThrowsError('""', "test");
    verifyUnescapeCharThrowsError('\\"', "test");
  });
});
