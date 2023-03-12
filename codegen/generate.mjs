#!/usr/bin/env zx
/* eslint-disable no-undef */
/* eslint-disable no-console */

import fs from "node:fs";

// TODO move into app/vscode-refactor as build step
import { generateKeyboardShortcutsMd } from "../app/vscode-refactor/media/keyboard-shortcuts.md.template.mjs";
import { generateVsCodePackageJson } from "../app/vscode-refactor/package.json.template.mjs";
import { generateAppVscodeReadmeMd } from "../app/vscode-refactor/README.md.template.mjs";

import { generateBundleCodeAssists } from "./src/generateBundleCodeAssists.mjs";
import { generateBundlePackageJson } from "./src/generateBundlePackageJson.mjs";
import { generateJestConfigJs } from "./src/generateJestConfigJs.mjs";
import { generatePackageJson } from "./src/generatePackageJson.mjs";
import { generateTsconfigJson } from "./src/generateTsconfigJson.mjs";
import { getCodeAssistMetadata } from "./src/getCodeAssistMetadata.mjs";
import { getSubdirectoryNames } from "./src/getSubdirectoryNames.mjs";

// assumption: script is run from root dir of project
const augmentations = getSubdirectoryNames("augmentation").map(
  (augmentationId) => {
    const augmentationFolder = `augmentation/${augmentationId}`;

    const configurationFile = `${augmentationFolder}/codegen.json`;
    const configuration = fs.existsSync(configurationFile)
      ? JSON.parse(fs.readFileSync(configurationFile))
      : {};

    return {
      id: augmentationId,
      configuration,
      folder: augmentationFolder,
    };
  }
);

const codeAssistIds = getSubdirectoryNames("code-assist");
const codeAssistMetadata = getCodeAssistMetadata("code-assist", codeAssistIds);
const codeAssistCategories = JSON.parse(
  fs.readFileSync("metadata/code-assist-categories.json", "utf8")
);
const keyboardShortcuts = JSON.parse(
  fs.readFileSync("metadata/keyboard-shortcuts.json", "utf8")
);

// TODO move to separate file
function generateKeyboardShortcutTableRow(id, { includeType = true } = {}) {
  const shortcut = keyboardShortcuts.find(
    (shortcut) =>
      shortcut.commandId === id || shortcut.codeActionKindPrefix === id
  );

  if (shortcut == null) {
    throw new Error(`unknown command id ${id}`);
  }

  const keys = {
    mac: {
      ctrl: "⌃",
      cmd: "⌘",
      alt: "⌥",
    },
    win: {
      ctrl: "Ctrl",
      alt: "Alt",
    },
    default: {
      shift: "⇧",
      right: "→",
      left: "←",
      up: "↑",
      down: "↓",
    },
  };

  const generateBindingLabel = (binding, os) =>
    binding
      .split("+")
      .map(
        (key) =>
          `<kbd>${
            keys[os]?.[key.toLowerCase()] ??
            keys.default[key.toLowerCase()] ??
            key.toUpperCase()
          }</kbd>`
      )
      .join(" + ");

  return `| **${shortcut.label}** | ${
    includeType ? ` *${shortcut.type}* | ` : ""
  } ${generateBindingLabel(
    shortcut.binding.mac,
    "mac"
  )} | ${generateBindingLabel(shortcut.binding.win, "win")} |`;
}

// augmentation setup
for (const augmentation of augmentations) {
  console.log(`Generating boilerplate for augmentation ${augmentation.id}`);

  // create directories if needed
  await $`mkdir -p "${augmentation.folder}/src"`;
  await $`mkdir -p "${augmentation.folder}/test"`;

  // copy artifacts
  await $`cp codegen/artifact/augmentation/spec.test.ts ${augmentation.folder}/test/${augmentation.id}.spec.test.ts`;
  await $`cp codegen/artifact/tsconfig.json ${augmentation.folder}/tsconfig.json`;

  const imports = ["@p42/engine"].concat(
    (augmentation.configuration.requiredAugmentations ?? []).map(
      (augmentationId) => `@p42/augmentation-${augmentationId}`
    )
  );

  generatePackageJson(
    `${augmentation.folder}/package.json`,
    `@p42/augmentation-${augmentation.id}`,
    imports
  );

  generateJestConfigJs(
    `${augmentation.folder}/jest.config.js`,
    `augmentation-${augmentation.id}`
  );
}

// code assist setup
for (const codeAssistId of codeAssistIds) {
  console.log(`Generating boilerplate for code assist ${codeAssistId}`);

  const codeAssistFolder = `code-assist/${codeAssistId}`;

  // create directories if needed
  await $`mkdir -p "${codeAssistFolder}/src"`;
  await $`mkdir -p "${codeAssistFolder}/test"`;

  // copy artifacts
  await $`cp codegen/artifact/code-assist/test/spec.test.ts ${codeAssistFolder}/test/${codeAssistId}.spec.test.ts`;
  await $`cp codegen/artifact/tsconfig.json ${codeAssistFolder}/tsconfig.json`;

  // generate template artifacts
  generatePackageJson(
    `${codeAssistFolder}/package.json`,
    `@p42/code-assist-${codeAssistId}`,
    augmentations
      .map((augmentation) => `@p42/augmentation-${augmentation.id}`)
      .concat("@p42/engine")
  );

  generateJestConfigJs(
    `${codeAssistFolder}/jest.config.js`,
    `code-assist-${codeAssistId}`
  );

  console.log(""); // add newline
}

// generate files that contain references to all refactorings
console.log(`Generating project files`);
generateTsconfigJson("tsconfig.json", codeAssistIds);
generateBundleCodeAssists("bundle/src/codeAssists.generated.ts", codeAssistIds);
generateBundlePackageJson(
  "bundle/package.json",
  augmentations.map((augmentation) => augmentation.id),
  codeAssistIds
);

generateVsCodePackageJson({
  path: "app/vscode-refactor/package.json",
  codeAssists: codeAssistMetadata,
  keyboardShortcuts,
});
generateAppVscodeReadmeMd({
  path: "app/vscode-refactor/README.md",
  codeAssists: codeAssistMetadata,
  codeAssistCategories,
  generateKeyboardShortcutTableRow,
});
generateKeyboardShortcutsMd({
  path: "app/vscode-refactor/media/keyboard-shortcuts.md",
  generateKeyboardShortcutTableRow,
});
