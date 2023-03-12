module.exports = {
  preset: "ts-jest",
  verbose: true,
  roots: ["./src"],
  testRegex: ".*.test.ts$",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: "@p42/hide-typescript-refactors",
        suiteNameTemplate: (vars) => vars.filepath.split("/")[0],
        classNameTemplate: (vars) => {
          const [, , ...withoutFirst2Elements] = vars.filepath.split("/");
          return withoutFirst2Elements.join("/");
        },
        titleTemplate: "{title}",
        ancestorSeparator: ".",
        outputDirectory: "./build/test-results/test",
        outputName: "TEST-ai.p42.app-vscode-hide-typescript-refactors.xml",
      },
    ],
  ],
};
