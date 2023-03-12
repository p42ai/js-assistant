import { Indenter } from "./Indenter";
import { PrintSettings } from "../PrintSettings";

describe("Indenter", () => {
  describe("with double space", () => {
    const indenter = new Indenter(
      new PrintSettings({
        singleIndentation: "  ",
      })
    );

    describe("reIndentReplacementText()", () => {
      it("should consider template lines", () => {
        expect(
          indenter.reIndentReplacementText(
            ["f(`", "  abc`,", "  2)"].join("\n"),
            0,
            false
          )
        ).toEqual(["f(`", "  abc`,", "2)"].join("\n"));
      });
    });

    describe("reIndentLines()", () => {
      it("should re-indent to 0", () => {
        expect(
          indenter.reIndentLines(["  1;", "    2;"], [false, false], 0)
        ).toEqual(["1;", "  2;"]);
      });

      it("should ignore empty / whitespace only lines", () => {
        expect(
          indenter.reIndentLines(
            ["  1;", "    2;", "", "  ", "    3;"],
            [false, false, false, false, false],
            2
          )
        ).toEqual(["    1;", "      2;", "", "  ", "      3;"]);
      });

      it("should leave extra space in comments when re-indenting", () => {
        expect(
          indenter.reIndentLines(
            ["/**", " * comment", " */", "code;"],
            [false, false, false, false],
            1
          )
        ).toEqual(["  /**", "   * comment", "   */", "  code;"]);
      });

      it("should indent trailing whitespace line", () => {
        expect(
          indenter.reIndentLines(
            ["  1;", "    2;", "", "  ", "    3;", "  "],
            [false, false, false, false, false, false],
            2
          )
        ).toEqual(["    1;", "      2;", "", "  ", "      3;", "    "]);
      });

      it("should not indent lines that start in templates", () => {
        expect(
          indenter.reIndentLines(
            ["  1;", "    2;", "", "  ", "    3;", "  "],
            [false, true, false, false, true, false],
            2
          )
        ).toEqual(["    1;", "    2;", "", "  ", "    3;", "    "]);
      });
    });
  });
});
