import { separateWhitespacePrefix } from "./separateWhitespacePrefix";

describe("separateWhitespacePrefix", () => {
  it("should separate ''", () => {
    expect(separateWhitespacePrefix("")).toEqual({
      prefix: "",
      remainder: "",
    });
  });

  it("should separate '  '", () => {
    expect(separateWhitespacePrefix("  ")).toEqual({
      prefix: "  ",
      remainder: "",
    });
  });

  it("should separate 'text'", () => {
    expect(separateWhitespacePrefix("text")).toEqual({
      prefix: "",
      remainder: "text",
    });
  });

  it("should separate '  text'", () => {
    expect(separateWhitespacePrefix("  text")).toEqual({
      prefix: "  ",
      remainder: "text",
    });
  });

  it("should separate '  \\n\\n  text\\n'", () => {
    expect(separateWhitespacePrefix("  \n\n  text\n")).toEqual({
      prefix: "  \n\n  ",
      remainder: "text\n",
    });
  });
});
