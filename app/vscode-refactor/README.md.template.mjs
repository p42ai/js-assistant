import fs from "node:fs";

export const generateAppVscodeReadmeMd = ({
  path,
  codeAssists,
  codeAssistCategories,
  generateKeyboardShortcutTableRow,
}) => {
  const activeCodeAssists = codeAssists.filter(
    (codeAssist) => codeAssist.isEnabled ?? true
  );

  fs.writeFileSync(
    path,
    `The P42 JS Assistant adds **over 120 code actions** and a **suggestion panel** for **JavaScript**, **TypeScript**, **React**, and **Vue.js** to Visual Studio Code.

> *[@p42ai makes refactoring a ton of fun ❤️](https://twitter.com/johnny_reilly/status/1526264716770803719)*&nbsp;&nbsp;&nbsp;— [John Reilly](https://twitter.com/johnny_reilly)

> *[Give it a try, it's awesome!](https://twitter.com/Idered/status/1448262441335468032)*&nbsp;&nbsp;— [Kasper Mikiewicz](https://twitter.com/Idered)

<div align="center">
  <p align="center">
    <a href="https://github.com/p42ai/refactor-vscode/issues">Report Bug</a>
    ·
    <a href="https://github.com/p42ai/refactor-vscode/issues">Request Feature</a>
    ·
    <a href="https://twitter.com/p42ai">Follow @p42ai</a>
  </p>
</div>

# Documentation

You can find the actions in the **quick fix** and **refactoring context menus**. They depend on the cursor position, the selected text (if any), the source code, the language type, and any available type information.
**Underlining with three dots** suggests beneficial refactorings that you can perform. The **suggestion panel** shows you recommended refactorings for your whole file.

## Keyboard Shortcuts

| Action | Type | Mac Shortcut | Windows/Linux Shortcut |
| :-- | :-- | --: | --: |
| **Quick Fix** | *context menu* | <kbd>⌘</kbd> + <kbd>.</kbd> | <kbd>Ctrl</kbd> + <kbd>.</kbd> |
${generateKeyboardShortcutTableRow("editor.action.refactor")}
${generateKeyboardShortcutTableRow("editor.action.sourceAction")}
${generateKeyboardShortcutTableRow("refactor.extract")}
${generateKeyboardShortcutTableRow("refactor.inline")}
${generateKeyboardShortcutTableRow("refactor.rewrite.toggle.braces")}
${generateKeyboardShortcutTableRow("refactor.move.up")}
${generateKeyboardShortcutTableRow("refactor.move.down")}
${generateKeyboardShortcutTableRow("p42.codeActionMenu.action")}

## Touch Bar
The P42 JS Assistant adds the following buttons to the MacOS touch bar:
* ✏️ &nbsp;&nbsp;**Rename**: Triggers the rename command on the current symbol.
* 🪄 &nbsp;&nbsp;**Quick Fix**: Opens the quick-fix context menu.
* 🔧 &nbsp;&nbsp;**Refactor**: Opens the refactor context menu.
* 📄 &nbsp;&nbsp;**Source Action**: Opens the source action context menu.

# Code Assists by Category
Code assists that belong to several categories appear more than once.

${codeAssistCategories
  .map(
    (category) => `## ${category.title}
${category.description ?? ""}
${activeCodeAssists
  .filter((codeAssist) =>
    codeAssist.documentation.categories.includes(category.id)
  )
  .map(
    (codeAssist) =>
      `* **${codeAssist.documentation.title}**: ${codeAssist.documentation.shortDescription}`
  )
  .join("\n")}
`
  )
  .join("\n")}
# Report Bugs and Suggest Features

Please report any bugs or feature suggestions in the **[JS Assistant issue tracker](https://github.com/p42ai/refactor-vscode/issues)**.

# License & Used Open Source Libraries

See [DISCLAIMER.txt](https://raw.githubusercontent.com/p42ai/refactor-vscode/main/DISCLAIMER.txt).`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${path}`);
};
