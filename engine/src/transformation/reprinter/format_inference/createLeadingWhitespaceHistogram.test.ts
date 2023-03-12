import { createLeadingWhitespaceHistogram } from "./createLeadingWhitespaceHistogram";

describe("createLeadingWhitespaceHistogram", () => {
  it("should create leading whitespace histogram ", () => {
    const lines = [
      "  const a = 1;",
      "  const b = 2;",
      "  function f() {",
      "    const c = 3;",
      "    const d = 4;",
      "  }",
    ];

    expect(createLeadingWhitespaceHistogram(lines)).toEqual({
      "  ": 4,
      "    ": 2,
    });
  });
});
