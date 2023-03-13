import * as fs from "fs";

const version = "3.0.1";
const name = "JS Refactoring Assistant";

const whenResourceExtension =
  "resourceExtname =~ /^(\\\\.js|\\\\.jsx|\\\\.cjs|\\\\.mjs|\\\\.ts|\\\\.tsx|\\\\.cts|\\\\.mts|\\\\.vue)$/";

const toCamelCase = (text) =>
  text.replace(/-([a-z0-9])/g, (result) => result[1].toUpperCase());

export const generateVsCodePackageJson = ({
  path,
  codeAssists,
  keyboardShortcuts,
}) => {
  const activeCodeAssists = codeAssists.filter(
    (codeAssist) => codeAssist.isEnabled ?? true
  );

  const generateConfigurations = () =>
    activeCodeAssists
      .filter((codeAssist) => codeAssist.suggestions?.available === true)
      .map(
        (codeAssist) => `        "p42.refactoring.${toCamelCase(
          codeAssist.id
        )}.suggestion": {
          "type": "string",
          "default": "${codeAssist.suggestions.defaultLevel ?? "hint"}",
          "enum": ["off", "hint", "information", "warning", "error"],
          "enumDescriptions": [
            "Suggestions are not shown.",
            "Suggestions are shown as hints (single character dots)",
            "Suggestions are shown as information (blue squiggly underline)",
            "Suggestions are shown as warning (yellow squiggly underline)",
            "Suggestions are shown as errors (red squiggly underline)"
          ],
          "markdownDescription": "How should ${
            codeAssist.documentation.title
          } suggestions be displayed?",
          "scope": "application"
        }`
      )
      .join(",\n");

  fs.writeFileSync(
    path,
    `{
  "publisher": "p42ai",
  "name": "refactor",
  "version": "${version}",
  "private": true,
  "pricing": "Trial",
  "scripts": {
    "clean": "rimraf .vscode-test dist build node_modules out *.vsix *.log",
    "clean-all": "yarn clean && cd hide-typescript-refactors && yarn clean && cd .. && cd extension && yarn clean && cd .. && cd webview && yarn clean && cd .. && cd shared && yarn clean && cd .. && cd server && yarn clean && cd ..",
    "vscode:prepublish": "yarn build-clean-production",
    "package": "vsce package --yarn",
    "package-ci": "vsce package --yarn --no-git-tag-version 9.9.9999",
    "build-clean-production": "yarn clean-all && yarn && yarn build-production && yarn copy-hide-typescript-refactors",
    "build-production": "yarn build-shared && yarn build-hide-typescript-refactors && yarn build-server-production && yarn build-extension-production && yarn build-webview-production",
    "build-shared": "cd shared; yarn build; cd ..",
    "build-hide-typescript-refactors": "cd hide-typescript-refactors; yarn build; cd ..",
    "build-server-production": "cd server; yarn build-production; cd ..",
    "build-extension-production": "cd extension; yarn build-production; cd ..",
    "build-webview-production": "cd webview; yarn build-production; cd ..",
    "copy-hide-typescript-refactors": "mkdir -p node_modules/@p42/hide-typescript-refactors/build && cp hide-typescript-refactors/package.json node_modules/@p42/hide-typescript-refactors && cp hide-typescript-refactors/build/index.js node_modules/@p42/hide-typescript-refactors/build",
    "lint": "yarn lint-server && yarn lint-extension && yarn lint-webview",
    "lint-server": "cd server && yarn lint && cd ..",
    "lint-extension": "cd extension && yarn lint && cd ..",
    "lint-webview": "cd webview && yarn lint && cd ..",
    "license:generate-disclaimer": "yarn licenses generate-disclaimer --prod > DISCLAIMER.txt",
    "test": "cd extension && yarn test && cd .. && cd shared && yarn test && cd .."
  },
  "displayName": "${name}",
  "description": "Edit, modernize, and refactor JavaScript, TypeScript, React, and Vue.js code effectively with over 120 code actions.",
  "keywords": [
    "refactor",
    "refactoring",
    "lint",
    "linting",
    "quick fix",
    "action",
    "code action",
    "code assist",
    "codemod",
    "keybinding",
    "keybindings",
    "javascript",
    "typescript",
    "react",
    "vue",
    "vuejs",
    "lodash",
    "js",
    "jsx",
    "cjs",
    "mjs",
    "ts",
    "tsx",
    "cts",
    "mts",
    "ecmascript",
    "es5",
    "es6",
    "es2015",
    "es2016",
    "es2017",
    "es2018",
    "es2019",
    "es2020",
    "es2021",
    "es2022",
    "programming languages",
    "languages",
    "legacy code",
    "clean code",
    "replace",
    "convert",
    "inline",
    "extract",
    "modernize",
    "modernization",
    "upgrade",
    "update"
  ],
  "categories": [
    "Linters",
    "Formatters",
    "Programming Languages",
    "Other"
  ],
  "icon": "image/p42-icon.png",
  "galleryBanner": {
    "color": "#F5F9FC",
    "theme": "light"
  },
  "license": "SEE LICENSE IN LICENSE.txt",
  "engines": {
    "vscode": "^1.72.0"
  },
  "dependencies": {
    "@p42/hide-typescript-refactors": "*"
  },
  "devDependencies": {
    "@vscode/vsce": "2.16.0"
  },
  "homepage": "https://github.com/p42ai/js-assistant/",
  "repository": "https://github.com/p42ai/js-assistant/",
  "bugs": "https://github.com/p42ai/js-assistant/issues",
  "extensionKind": [
    "workspace"
  ],
  "capabilities": {
    "virtualWorkspaces": {
      "supported": true
    }
  },
  "main": "./extension/dist/extension-node.js",
  "browser": "./extension/dist/extension-browser.js",
  "activationEvents": [
    "onCommand:p42.getStarted",
    "onCommand:p42.massRefactor",
    "onCommand:p42.openFileDependencyGraph",
    "onCommand:p42.openDocumentation",
    "onCommand:p42.openLandingPage",
    "onCommand:p42.openSettings",
    "onCommand:p42.touchBar.rename",
    "onCommand:p42.touchBar.quickFix",
    "onCommand:p42.touchBar.sourceAction",
    "onCommand:p42.touchBar.refactor",
    "onLanguage:javascript",
    "onLanguage:javascriptreact",
    "onLanguage:typescript",
    "onLanguage:typescriptreact",
    "onLanguage:vue",
    "onView:p42.assistant"
  ],
  "contributes": {
    "commands": [
      {
        "command": "p42.massRefactor",
        "title": "Mass Refactor… [P42]",
        "category": "P42"
      },
      {
        "command": "p42.openFileDependencyGraph",
        "title": "Open File Dependency Graph (experimental) [P42]",
        "category": "P42"
      },
      {
        "command": "p42.openSettings",
        "title": "Open Settings",
        "category": "P42",
        "icon": "$(gear)"
      },
      {
        "command": "p42.getStarted",
        "title": "Get Started",
        "category": "P42",
        "icon": "$(question)"
      },
      {
        "command": "p42.openDocumentation",
        "title": "Open Documentation…",
        "category": "P42",
        "icon": "$(question)"
      },
      {
        "command": "p42.touchBar.rename",
        "category": "P42",
        "title": "✏️"
      },
      {
        "command": "p42.touchBar.quickFix",
        "category": "P42",
        "title": "🪄"
      },
      {
        "command": "p42.touchBar.sourceAction",
        "category": "P42",
        "title": "📄"
      },
      {
        "command": "p42.touchBar.refactor",
        "category": "P42",
        "title": "🔧"
      }
    ],
    "keybindings": [
${keyboardShortcuts
  .map((shortcut) =>
    shortcut.commandId != null
      ? `      {
        "command": "${shortcut.commandId}",
        "when": "editorTextFocus && isMac && ${whenResourceExtension}",
        "key": "${shortcut.binding.mac}"
      },
      {
        "command": "${shortcut.commandId}",
        "when": "editorTextFocus && !isMac && ${whenResourceExtension}",
        "key": "${shortcut.binding.win}"
      }`
      : `      {
        "command": "editor.action.codeAction",
        "when": "editorTextFocus && isMac && ${whenResourceExtension}",
        "key": "${shortcut.binding.mac}",
        "args": { 
          "kind": "${shortcut.codeActionKindPrefix}",
          "apply": "ifSingle"
        }
      },
      {
        "command": "editor.action.codeAction",
        "when": "editorTextFocus && !isMac && ${whenResourceExtension}",
        "key": "${shortcut.binding.win}",
        "args": { 
          "kind": "${shortcut.codeActionKindPrefix}",
          "apply": "ifSingle"
        }
      }`
  )
  .join(",\n")}
    ],
    "menus": {
      "view/title": [
        {
          "command": "p42.getStarted",
          "when": "view == p42.assistant",
          "group": "navigation"
        },
        {
          "command": "p42.openSettings",
          "when": "view == p42.assistant",
          "group": "navigation"
        }
      ],
      "explorer/context": [
        {
          "when": "explorerResourceIsFolder",
          "command": "p42.massRefactor",
          "group": "7_modification"
        },
        {
          "when": "resourceLangId == javascript",
          "command": "p42.massRefactor",
          "group": "7_modification"
        },
        {
          "when": "resourceLangId == javascriptreact",
          "command": "p42.massRefactor",
          "group": "7_modification"
        },
        {
          "when": "resourceLangId == typescript",
          "command": "p42.massRefactor",
          "group": "7_modification"
        },
        {
          "when": "resourceLangId == typescriptreact",
          "command": "p42.massRefactor",
          "group": "7_modification"
        },
        {
          "when": "resourceLangId == vue",
          "command": "p42.massRefactor",
          "group": "7_modification"
        },
        {
          "when": "explorerResourceIsFolder && config.p42.feature.dependencyVisualization.enabled",
          "command": "p42.openFileDependencyGraph",
          "group": "2_workspace"
        }
      ],
      "touchBar": [
        {
          "command": "p42.touchBar.rename",
          "group": "p42",
          "when": "config.p42.touchBar.rename.enabled && isMac && ${whenResourceExtension}"
        },
        {
          "command": "p42.touchBar.quickFix",
          "group": "p42",
          "when": "config.p42.touchBar.quickFix.enabled && isMac && ${whenResourceExtension}"
        },
        {
          "command": "p42.touchBar.sourceAction",
          "group": "p42",
          "when": "config.p42.touchBar.sourceAction.enabled && isMac && ${whenResourceExtension}"
        },
        {
          "command": "p42.touchBar.refactor",
          "group": "p42",
          "when": "config.p42.touchBar.refactor.enabled && isMac && ${whenResourceExtension}"
        }
      ],
      "commandPalette": [
        {
          "command": "p42.touchBar.rename",
          "when": "false"
        },
        {
          "command": "p42.touchBar.quickFix",
          "when": "false"
        },
        {
          "command": "p42.touchBar.sourceAction",
          "when": "false"
        },
        {
          "command": "p42.touchBar.refactor",
          "when": "false"
        },
        {
          "command": "p42.massRefactor",
          "when": "false"
        },
        {
          "command": "p42.openFileDependencyGraph",
          "when": "false"
        }
      ]
    },
    "viewsContainers": {
      "activitybar": [
        {
          "id": "p42",
          "title": "P42 JS Assistant",
          "icon": "image/p42-sidebar-icon.svg"
        }
      ]
    },
    "views": {
      "p42": [
        {
          "id": "p42.assistant",
          "name": "Suggestions",
          "type": "webview",
          "icon": "image/p42-sidebar-icon.svg"
        }
      ]
    },
    "walkthroughs": [
      {
        "id": "p42",
        "when": "config.p42.showGetStarted",
        "title": "P42 JS Assistant",
        "description": "Your helper for writing modern, clean and concise code.",
        "steps": [
          {
            "id": "benefits",
            "title": "Become a more effective developer",
            "description": "How does the JS Assistant help you?",
            "media": {
              "markdown": "media/benefits.md"
            }
          },
          {
            "id": "code-actions",
            "title": "Code actions",
            "description": "Make **fast and accurately semantic changes** to your code with automated actions and refactorings.",
            "media": {
              "markdown": "media/code-actions.md"
            }
          },
          {
            "id": "rewrite",
            "title": "Rewrite and modernize",
            "description": "Switch between different idioms. Update your code to use modern JavaScript patterns.",
            "media": {
              "markdown": "media/rewrite.md"
            }
          },
          {
            "id": "extract",
            "title": "Extract",
            "description": "Structure your code and remove duplication by extracting variables, strings, and React functional components.",
            "media": {
              "markdown": "media/extract.md"
            }
          },
          {
            "id": "inline",
            "title": "Inline",
            "description": "Streamline your code by inlining variables and assignments.",
            "media": {
              "markdown": "media/inline.md"
            }
          },
          {
            "id": "move",
            "title": "Move",
            "description": "Re-order your code to make it easier to understand.",
            "media": {
              "markdown": "media/move.md"
            }
          },
          {
            "id": "safety-analysis",
            "title": "Refactor safely",
            "description": "Refactorings can sometimes break your code. The safety analysis helps you understand and mitigate their risks.",
            "media": {
              "markdown": "media/safety-analysis.md"
            }
          },
          {
            "id": "keyboard-shortcuts",
            "title": "Keyboard shortcuts",
            "description": "Master the refactoring shortcuts and edit your code even faster.",
            "media": {
              "markdown": "media/keyboard-shortcuts.md"
            }
          },
          {
            "id": "configuration",
            "title": "Configuration",
            "description": "Change the P42 settings to match your preferences. \\n[Open P42 Settings](command:p42.openSettings)",
            "media": {
              "markdown": "media/configuration.md"
            }
          },
          {
            "id": "next-steps",
            "title": "Next steps",
            "description": "Learn more about the JS Assistant functionality.",
            "media": {
              "markdown": "media/next-steps.md"
            }
          }
        ]
      }
    ],
    "typescriptServerPlugins": [
      {
        "name": "@p42/hide-typescript-refactors",
        "enableForWorkspaceTypeScriptVersions": true
      }
    ],
    "configuration": {
      "title": "P42 JS Assistant",
      "properties": {
        "p42.feature.cloudAI.enabled": {
          "type": "boolean",
          "default": false,
          "markdownDescription": "Enable Cloud AI actions.\\n\\nCloud AI actions are indicated by \`👤 AI\` in the label. When you execute a Cloud AI action, relevant parts of your code will be send to the P42 cloud for processing. Each execution of a Cloud AI action costs an AI credit.\\n\\n\u00A0\\n\\n⚠️ AI-generated content can be incorrect or misleading. Use with caution.",
          "scope": "application"
        },
        "p42.feature.dependencyVisualization.enabled": {
          "type": "boolean",
          "default": false,
          "description": "Enable the dependency graph feature.\\n\\nThe feature is under development. Expect bugs and frequent changes.",
          "scope": "application"
        },
        "p42.touchBar.rename.enabled": {
          "type": "boolean",
          "default": true,
          "markdownDescription": "Enable the ✏️ (Rename) button in the Touch Bar.",
          "scope": "application"
        },
        "p42.touchBar.quickFix.enabled": {
          "type": "boolean",
          "default": true,
          "markdownDescription": "Enable the 🪄 (Quick Fix) button in the Touch Bar.",
          "scope": "application"
        },
        "p42.touchBar.refactor.enabled": {
          "type": "boolean",
          "default": true,
          "markdownDescription": "Enable the 🔧 (Refactor) button in the Touch Bar.",
          "scope": "application"
        },
        "p42.touchBar.sourceAction.enabled": {
          "type": "boolean",
          "default": true,
          "markdownDescription": "Enable the 📄 (Source Action) button in the Touch Bar.",
          "scope": "application"
        },
        "p42.animation.codeAssist": {
          "type": "string",
          "default": "all",
          "enum": [
            "all",
            "off"
          ],
          "enumDescriptions": [
            "Animate all code assists that support it.",
            "Disables all code assist animations."
          ],
          "markdownDescription": "Should code assists be animated (with highlights) when possible?",
          "scope": "application"
        },
        "p42.suggestionSafety": {
          "type": "string",
          "default": "Show all suggestions",
          "enum": [
            "Show all suggestions",
            "Show only safe suggestions"
          ],
          "enumDescriptions": [
            "Safe and unsafe suggestions will be shown as diagnostics in the editor and in the panel.",
            "Only safe suggestions will be shown as diagnostics in the editor and in the panel."
          ],
          "markdownDescription": "Which suggestions should be shown?",
          "scope": "application"
        },
        "p42.suggestionBadge": {
          "type": "string",
          "default": "Show badge for all suggestions",
          "enum": [
            "Show badge for all suggestions",
            "Show badge only for safe suggestions",
            "Do not show badge"
          ],
          "enumDescriptions": [
            "The suggestion badge shows the count of all suggestions for the active editor.",
            "The suggestion badge shows the count of the safe suggestions for the active editor.",
            "The suggestion badge is not shown."
          ],
          "markdownDescription": "How should the badge with the number of suggestions be shown?",
          "scope": "application"
        },
        "p42.overlappingCodeAssistVisibility": {
          "type": "string",
          "default": "Show only P42 code assists",
          "enum": [
            "Show only P42 code assists",
            "Show only default code assists",
            "Show all code assists"
          ],
          "enumDescriptions": [
            "The default code assists are hidden when a similar P42 code assist is available.",
            "The P42 code assists are hidden when a similar default code assist is available.",
            "Both the P42 code assists and the default code assists are shown when there is overlap."
          ],
          "markdownDescription": "Which code assists should be shown when there is an overlap between the P42 JS Assistant and the default code assists?",
          "scope": "application"
        },
        "p42.safetyAnalysisVisibility": {
          "type": "string",
          "default": "Show safety indicator and message",
          "enum": [
            "Show safety indicator and message",
            "Show safety indicator",
            "Do not show safety analysis"
          ],
          "enumDescriptions": [
            "A safety indicator (🟢 🔵 🟡 🔴) and a message will be shown after the code assist description, e.g., 'convert to if-else 🟢 safe'.",
            "A safety indicator (🟢 🔵 🟡 🔴) will be shown after the code assist description, e.g., 'convert to if-else 🟢'.",
            "No safety information will be shown after the code assist description, e.g., 'convert to if-else'."
          ],
          "markdownDescription": "How should safety analysis results be shown?",
          "scope": "application"
        },
${generateConfigurations()}
      }
    }
  }
}
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${path}`);
};
