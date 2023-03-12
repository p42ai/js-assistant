import * as fs from "fs";

export function generateBundlePackageJson(
  filename,
  augmentationIds,
  codeActionIds
) {
  fs.writeFileSync(
    filename,
    `{
  "name": "@p42/bundle",
  "version": "0.0.1",
  "private": true,
  "main": "build/index.js",
  "scripts": {
    "clean": "rimraf build node_modules tsconfig.tsbuildinfo",
    "build": "tsc --build",
    "build-dev": "mkdir -p build && tsc --build --watch",
    "lint": "eslint -c ../.eslintrc --no-error-on-unmatched-pattern src",
    "format": "prettier -w \\"**/*.{ts,tsx}\\"",
    "test": "jest --passWithNoTests"
  },
  "dependencies": {
    ${augmentationIds.map(
      (augmentationId) => `"@p42/augmentation-${augmentationId}": "*"`
    ).join(`,
    `)},
    ${codeActionIds.map(
      (codeActionId) => `"@p42/code-assist-${codeActionId}": "*"`
    ).join(`,
    `)},
    "@p42/engine": "*"
  }
}
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
