import { findLinesThatStartInTemplate } from "./findLinesThatStartInTemplate";

const testFindTemplateStarts = (
  startsInTemplate: boolean,
  lines: Array<string>,
  expectedTemplateStarts: Array<boolean>
) => {
  expect(findLinesThatStartInTemplate(startsInTemplate, lines)).toEqual(
    expectedTemplateStarts
  );
};

describe("findLinesThatStartInTemplate", () => {
  describe("basic template", () => {
    it("should find template starts in 2-line template", () => {
      testFindTemplateStarts(false, ["`", "inside template`"], [false, true]);
    });

    it("should find template starts in 2 2-line template separated by a regular line", () => {
      testFindTemplateStarts(
        false,
        [
          "f(`",
          "inside template 1`,",
          "somethingElse,",
          "`start",
          " template 2`)",
        ],
        [false, true, false, false, true]
      );
    });

    describe("start inside template", () => {
      it("should find template starts when starting in template", () => {
        testFindTemplateStarts(true, ["test}56", "79`"], [true, true]);
      });
    });

    describe("escaping", () => {
      it("should not end template when backtick is escaped", () => {
        testFindTemplateStarts(
          false,
          ["`\\`", "inside template`"],
          [false, true]
        );
      });

      it("should end template when backtick is double escaped", () => {
        testFindTemplateStarts(
          false,
          ["f(`\\\\`,", "outsideTemplate())"],
          [false, false]
        );
      });

      it("should not end template when backtick is triple escaped", () => {
        testFindTemplateStarts(
          false,
          ["`\\\\\\`", "inside template`"],
          [false, true]
        );
      });
    });
  });

  describe("nested templates", () => {
    it("should mark all lines inside outer template as template starts", () => {
      // Rationale: code formatters reset the indentation level for expressions inside templates.
      // If P42 would apply the target indentation level, the code inside the template will be reformatted,
      // making diffs hard to read. Therefore code (even expressions) within an outer template
      // should not get re-indented.
      testFindTemplateStarts(
        false,
        ["`start template ${", "f(a, b, c)", "}", " in template`"],
        [false, true, true, true]
      );
    });

    it("should handle 2-level nested templates", () => {
      testFindTemplateStarts(
        false,
        ["f(`template 1 ${f(`template2", "in template 2`)}", "`,", "x)"],
        [false, true, true, false]
      );
    });

    it("should handle 3-level nested templates", () => {
      testFindTemplateStarts(
        false,
        [
          "f(`template 1 ${f(`template2",
          "in template 2${`template3",
          "`}`)}",
          "`,",
          "x)",
        ],
        [false, true, true, true, false]
      );
    });

    describe("escaping", () => {
      it("should ignore escaped nesting", () => {
        testFindTemplateStarts(
          false,
          ["f(`template 1 \\${f(`,", "noTemplate)"],
          [false, false]
        );
      });

      it("should consider double-escaped dollar", () => {
        testFindTemplateStarts(
          false,
          ["f(`template 1 \\\\${f(`template2", "in template 2`)}", "`,", "x)"],
          [false, true, true, false]
        );
      });

      it("should ignore triple-escaped nesting", () => {
        testFindTemplateStarts(
          false,
          ["f(`template 1 \\\\\\${f(`,", "noTemplate)"],
          [false, false]
        );
      });
    });
  });

  describe("single quoted string", () => {
    it("should ignore backticks inside single quoted string", () => {
      testFindTemplateStarts(false, ["'`',", " noTemplate"], [false, false]);
    });

    it("should identify template after string", () => {
      testFindTemplateStarts(
        false,
        ["f('',", " `", "inside template`)"],
        [false, false, true]
      );
    });

    describe("escaping", () => {
      it("should not start template when single quote is escaped", () => {
        testFindTemplateStarts(
          false,
          ["f('\\'`',", " `", "inside template`)"],
          [false, false, true]
        );
      });

      it("should start template when single quote is double escaped", () => {
        testFindTemplateStarts(
          false,
          ["f('\\\\', `", "inside template`)"],
          [false, true]
        );
      });

      it("should not start template when single quote is triple-escaped", () => {
        testFindTemplateStarts(
          false,
          ["f('\\\\\\'`',", " `", "inside template`)"],
          [false, false, true]
        );
      });
    });
  });

  describe("double quoted string", () => {
    it("should ignore backticks inside double quoted string", () => {
      testFindTemplateStarts(false, ['"`",', " noTemplate"], [false, false]);
    });

    it("should identify template after string", () => {
      testFindTemplateStarts(
        false,
        ['f("",', " `", "inside template`)"],
        [false, false, true]
      );
    });

    describe("escaping", () => {
      it("should not start template when double quote is escaped", () => {
        testFindTemplateStarts(
          false,
          ['f("\\"`",', " `", "inside template`)"],
          [false, false, true]
        );
      });

      it("should start template when double quote is double escaped", () => {
        testFindTemplateStarts(
          false,
          ['f("\\\\", `', "inside template`)"],
          [false, true]
        );
      });

      it("should not start template when double quote is triple-escaped", () => {
        testFindTemplateStarts(
          false,
          ['f("\\\\\\"`",', " `", "inside template`)"],
          [false, false, true]
        );
      });
    });
  });

  describe("end of line comment", () => {
    it("should ignore backticks inside end of line comment", () => {
      testFindTemplateStarts(false, ["// `", "noTemplate"], [false, false]);
    });
  });

  describe("multi-line comment", () => {
    it("should ignore backticks inside multi-line comment", () => {
      testFindTemplateStarts(
        false,
        ["/* `", "noTemplate `", "` */", "`", "in template`"],
        [false, false, false, false, true]
      );
    });
  });
});
