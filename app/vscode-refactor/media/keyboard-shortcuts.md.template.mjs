import fs from "node:fs";

export const generateKeyboardShortcutsMd = ({
  path,
  generateKeyboardShortcutTableRow,
}) => {
  fs.writeFileSync(
    path,
    `# Context Menus Shortcuts
The following context menus can be opened with keyboard shortcuts in the editor:

|  | Mac Shortcut | Windows/Linux Shortcut |
| :-- | --: | --: |
| **Quick Fix** | <kbd>⌘</kbd> + <kbd>.</kbd> | <kbd>Ctrl</kbd> + <kbd>.</kbd>
${generateKeyboardShortcutTableRow("editor.action.refactor", {
  includeType: false,
})}
${generateKeyboardShortcutTableRow("editor.action.sourceAction", {
  includeType: false,
})}
${generateKeyboardShortcutTableRow("p42.codeActionMenu.action", {
  includeType: false,
})}

# Action Shortcuts
Several actions can also be executed directly:

|  | Mac Shortcut | Windows/Linux Shortcut |
| :-- | --: | --: |
| **Rename** | <kbd>F2</kbd> | <kbd>F2</kbd>
${generateKeyboardShortcutTableRow("refactor.extract", {
  includeType: false,
})}
${generateKeyboardShortcutTableRow("refactor.inline", {
  includeType: false,
})}
${generateKeyboardShortcutTableRow("refactor.rewrite.toggle.braces", {
  includeType: false,
})}
${generateKeyboardShortcutTableRow("refactor.move.up", {
  includeType: false,
})}
${generateKeyboardShortcutTableRow("refactor.move.down", {
  includeType: false,
})}

# Selection Shortcuts
The smart shrink and expand selection shortcuts are essential for creating semantic selections that provide the right context when triggering refactorings:

|  | Mac Shortcut | Windows/Linux Shortcut |
| :-- | --: | --: |
| **Smart Expand Selection** | <kbd>⌃</kbd> + <kbd>⇧</kbd> + <kbd>⌘</kbd> + <kbd>→</kbd> | <kbd>⇧</kbd> + <kbd>Alt</kbd> + <kbd>→</kbd>
| **Smart Shrink Selection** | <kbd>⌃</kbd> + <kbd>⇧</kbd> + <kbd>⌘</kbd> + <kbd>←</kbd> | <kbd>⇧</kbd> + <kbd>Alt</kbd> + <kbd>←</kbd>

# Touch Bar
The P42 JS Assistant adds the following buttons to the MacOS touch bar:
* ✏️ (Rename): Triggers the rename command on the current symbol.
* 🪄 (Quick Fix): Opens the quick-fix context menu.
* 🔧 (Refactor): Opens the refactor context menu.
* 📄 (Source Action): Opens the source action context menu.

You can change the touch button visibility in the [P42 Settings](command:p42.openSettings).

> 💡&nbsp;&nbsp;[Learn more about configuring the touch bar in Visual Studio Code](https://p42.ai/blog/2022-10-21/how-to-configure-the-touch-bar-in-visual-studio-code-in-under-5-minutes).

# Shortcut Customization
You can [setup custom refactoring shortcuts](https://p42.ai/documentation/p42-for-vscode/editor-integration#custom-keyboard-shortcuts) in the Visual Studio Code [Keyboard Shortcuts settings](command:workbench.action.openGlobalKeybindings).`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${path}`);
};
