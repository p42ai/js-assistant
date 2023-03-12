import _ from "lodash";
import { Range } from "../../util/text/Range";
import { parseComments } from "./parseComments";

describe("parseComments", () => {
  describe("multi line comments", () => {
    it("should parse single multi-line comment", () => {
      expect(parseComments(`/* comment */`).comments).toEqual([
        new Range(0, 13),
      ]);
    });

    it("should ignore multi-line start inside multi-line comment", () => {
      expect(parseComments(`/* /* comment */`).comments).toEqual([
        new Range(0, 16),
      ]);
    });

    it("should ignore single-line start inside multi-line comment", () => {
      expect(parseComments(`/* // comment */`).comments).toEqual([
        new Range(0, 16),
      ]);
    });

    it("should ignore double quote in multi line comment", () => {
      expect(
        parseComments(`/* " */
// comment 2`).comments
      ).toEqual([new Range(0, 7), new Range(8, 20)]);
    });

    it("should ignore single quote in multi line comment", () => {
      expect(
        parseComments(`/* ' */
// comment 2`).comments
      ).toEqual([new Range(0, 7), new Range(8, 20)]);
    });

    it("should ignore backtick in multi line comment", () => {
      expect(
        parseComments(`/* \` */
// comment 2`).comments
      ).toEqual([new Range(0, 7), new Range(8, 20)]);
    });
  });

  describe("single line comments", () => {
    it("should parse single line comment with preceding whitespace", () => {
      expect(parseComments(`   // comment`).comments).toEqual([
        new Range(3, 13),
      ]);
    });

    it("should ignore single line comment start inside single line comment", () => {
      expect(parseComments(`// // comment`).comments).toEqual([
        new Range(0, 13),
      ]);
    });

    it("should ignore /* inside single line comment", () => {
      expect(
        parseComments(`// /*
// */`).comments
      ).toEqual([new Range(0, 5), new Range(6, 11)]);
    });

    it("should parse single line comment at end of file", () => {
      expect(parseComments(`// comment`).comments).toEqual([new Range(0, 10)]);
    });

    it("should parse two line comments in the middle", () => {
      expect(
        parseComments(`a;
// comment 1
// comment 2
b;`).comments
      ).toEqual([new Range(3, 15), new Range(16, 28)]);
    });

    it("should ignore double quote in single line comment", () => {
      expect(
        parseComments(`// "
// comment 2`).comments
      ).toEqual([new Range(0, 4), new Range(5, 17)]);
    });

    it("should ignore single quote in single line comment", () => {
      expect(
        parseComments(`// '
// comment 2`).comments
      ).toEqual([new Range(0, 4), new Range(5, 17)]);
    });

    it("should ignore backtick in single line comment", () => {
      expect(
        parseComments(`// \`
// comment 2`).comments
      ).toEqual([new Range(0, 4), new Range(5, 17)]);
    });
  });

  describe("inside double quotes", () => {
    it("should ignore // inside double quoted string", () => {
      expect(parseComments(`"// comment"`).comments).toEqual([]);
    });

    it("should ignore /* inside double quoted string", () => {
      expect(parseComments(`"/* comment */" // */`).comments).toEqual([
        new Range(16, 21),
      ]);
    });

    it("should parse single line comment after double quotes closed", () => {
      expect(parseComments(`"something"; // comment`).comments).toEqual([
        new Range(13, 23),
      ]);
    });

    it("should ignore single quote", () => {
      expect(parseComments(`"'"; // comment`).comments).toEqual([
        new Range(5, 15),
      ]);
    });

    it("should ignore backtick", () => {
      expect(parseComments(`"\`"; // comment`).comments).toEqual([
        new Range(5, 15),
      ]);
    });

    it("should ignore // inside double quoted string with escaped double quote", () => {
      expect(parseComments(`"\\"// comment"`).comments).toEqual([]);
    });

    it("should ignore // inside double quoted string with triple-escaped double quote", () => {
      expect(parseComments(`"\\\\\\"// comment"`).comments).toEqual([]);
    });
  });

  describe("inside single quotes", () => {
    it("should ignore // inside single quoted string", () => {
      expect(parseComments(`'// comment'`).comments).toEqual([]);
    });

    it("should ignore /* inside single quoted string", () => {
      expect(parseComments(`'/* comment */' // */`).comments).toEqual([
        new Range(16, 21),
      ]);
    });

    it("should ignore // inside single quoted string with escaped single quote", () => {
      expect(parseComments(`'\\'// comment'`).comments).toEqual([]);
    });

    it("should ignore // inside single quoted string with triple-escaped single quote", () => {
      expect(parseComments(`'\\\\\\'// comment'`).comments).toEqual([]);
    });

    it("should parse single line comment after single quotes closed", () => {
      expect(parseComments(`'something'; // comment`).comments).toEqual([
        new Range(13, 23),
      ]);
    });

    it("should ignore double quote", () => {
      expect(parseComments(`'"'; // comment`).comments).toEqual([
        new Range(5, 15),
      ]);
    });

    it("should ignore backtick", () => {
      expect(parseComments(`'\`'; // comment`).comments).toEqual([
        new Range(5, 15),
      ]);
    });
  });

  describe("inside template", () => {
    it("should ignore // inside template string", () => {
      expect(parseComments("`// comment`").comments).toEqual([]);
    });

    it("should ignore /* inside template", () => {
      expect(parseComments("`/* comment */` // */").comments).toEqual([
        new Range(16, 21),
      ]);
    });

    it("should parse single line comment after backticks closed", () => {
      expect(parseComments("`something`; // comment").comments).toEqual([
        new Range(13, 23),
      ]);
    });

    it("should ignore single quote", () => {
      expect(parseComments("`'`; // comment").comments).toEqual([
        new Range(5, 15),
      ]);
    });

    it("should ignore double quote", () => {
      expect(parseComments('`"`; // comment').comments).toEqual([
        new Range(5, 15),
      ]);
    });
    it("should ignore // inside template with escaped backtick", () => {
      expect(parseComments("`\\`// comment`").comments).toEqual([]);
    });

    it("should ignore // inside template with triple-escaped backtick", () => {
      expect(parseComments("`\\\\\\`// comment`").comments).toEqual([]);
    });
  });
});
