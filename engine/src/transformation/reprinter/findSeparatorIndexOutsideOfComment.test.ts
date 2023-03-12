import { findSeparatorIndexOutsideOfComment } from "./findSeparatorIndexOutsideOfComment";

describe("findSeparatorIndexOutsideOfComment", () => {
  describe("comma separator", () => {
    it("should return the index of a comma in a text without comments", () => {
      expect(findSeparatorIndexOutsideOfComment("a, b", ",")).toEqual(1);
    });

    it("should return -1 when the character cannot be found", () => {
      expect(findSeparatorIndexOutsideOfComment("abc", ",")).toEqual(-1);
    });

    describe("multi-line comment", () => {
      it("should return -1 when the character is inside a multi-line comment", () => {
        expect(
          findSeparatorIndexOutsideOfComment("abc /* comment, */", ",")
        ).toEqual(-1);
      });

      it("should return index of character in line after multi-line comment", () => {
        expect(
          findSeparatorIndexOutsideOfComment("abc /* comment */, cde", ",")
        ).toEqual(17);
      });
    });

    describe("end-of-line comment", () => {
      it("should return -1 when the character is inside end-of-line comment", () => {
        expect(
          findSeparatorIndexOutsideOfComment("abc // comment, ", ",")
        ).toEqual(-1);
      });

      it("should return index of character in line after end-of-line comment", () => {
        expect(
          findSeparatorIndexOutsideOfComment("abc // comment\n, cde", ",")
        ).toEqual(15);
      });
    });
  });

  describe("newline separator", () => {
    describe("end-of-line comment", () => {
      it("should return index of character at the end of end-of-line comment", () => {
        expect(
          findSeparatorIndexOutsideOfComment("abc // comment\n, cde", "\n")
        ).toEqual(14);
      });
    });
  });

  describe("carriage return newline separator", () => {
    it("should return index", () => {
      expect(
        findSeparatorIndexOutsideOfComment("abc\r\n, cde", "\r\n")
      ).toEqual(3);
    });

    describe("end-of-line comment", () => {
      it("should return index of character at the end of end-of-line comment", () => {
        expect(
          findSeparatorIndexOutsideOfComment("abc // comment\r\n, cde", "\r\n")
        ).toEqual(14);
      });
    });
  });
});
