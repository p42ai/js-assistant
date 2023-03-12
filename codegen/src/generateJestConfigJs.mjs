import * as fs from "fs";

export function generateJestConfigJs(filename, moduleName) {
  fs.writeFileSync(
    filename,
    `module.exports = {
  preset: "ts-jest",
  verbose: true,
  roots: ["."],
  testRegex: ".*\\\\.test\\\\.ts$",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: "@p42/${moduleName}",
        suiteNameTemplate: (vars) => vars.filepath.split("/")[0],
        classNameTemplate: (vars) => {
          const [, , ...withoutFirst2Elements] = vars.filepath.split("/");
          return withoutFirst2Elements.join("/");
        },
        titleTemplate: "{title}",
        ancestorSeparator: ".",
        outputDirectory: "./build/test-results/test",
        outputName: "TEST-p42.${moduleName}.xml",
      },
    ],
  ],
};
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
