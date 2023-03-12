module.exports = {
  preset: "ts-jest",
  verbose: true,
  roots: ["."],
  testRegex: ".*.test.ts$",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: "@p42/refactoring-bundle",
        suiteNameTemplate: (vars) => vars.filepath.split("/")[0],
        classNameTemplate: (vars) => {
          const [, , ...withoutFirst2Elements] = vars.filepath.split("/");
          return withoutFirst2Elements.join("/");
        },
        titleTemplate: "{title}",
        ancestorSeparator: ".",
        outputDirectory: "./build/test-results/test",
        outputName: "TEST-ai.p42.refactoring-bundle.xml",
      },
    ],
  ],
};
