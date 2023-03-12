import * as fs from "fs";

export function generatePackageJson(filename, name, dependencies) {
  fs.writeFileSync(
    filename,
    `{
  "name": "${name}",
  "version": "0.0.1",
  "private": true,
  "main": "build/index.js",
  "scripts": {
    "clean": "rimraf build node_modules tsconfig.tsbuildinfo",
    "build": "tsc --build",
    "watch": "tsc --watch",
    "lint": "eslint -c ../../.eslintrc --no-error-on-unmatched-pattern src",
    "format": "prettier -w \\"**/*.{ts,tsx}\\"",
    "test": "jest"
  },
  "dependencies": {
    ${dependencies.map((dependency) => `"${dependency}": "*"`).join(",\n    ")}
  }
}
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
