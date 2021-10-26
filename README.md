<br />
<div align="center">
  <a href="https://p42.ai">
    <img 
      src="https://p42.ai/image/vscode/robot_juggling_300.png" 
      alt="JavaScript Assistant"
      height="300" />
  </a>
  <h1 align="center" style="padding-top: 20px;">P42 JavaScript Assistant</h2>
  

  <p align="center">
    Your helper for writing modern, clear, and concise code.
    <br />
    <br />
    <img src="https://p42.ai/image/vscode/vscode-intro.gif" 
         alt="Refactoring Example" />
    <br />
    <a href="https://github.com/p42ai/refactor-vscode/issues">Report Bug</a>
    ·
    <a href="https://github.com/p42ai/refactor-vscode/issues">Request Feature</a>
    ·
    <a href="https://twitter.com/p42ai">Follow @p42ai</a>
  </p>
  
</div>


# Getting Started

P42 adds **[44 automated refactorings and code actions](https://p42.ai/documentation/code-action/) for JavaScript and TypeScript**. The available actions depend on the cursor position, the selected text (if any), the source code, the language type, and any available type information. 

You can find available actions in the VS Code **quick fix and refactoring context menus** and in context menus for specific action types. In some situations, **refactoring hints with a blue squiggly underline** indicate beneficial actions that you can take. 

To help you refactor with confidence, P42 evaluates the impact on the logical program behavior and often shows **refactoring safety information** in the context menu entry.

## Keyboard Shortcuts

- **Quick Fix** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>.</kbd> (default VS Code shortcut)
  - Windows <kbd>CTRL</kbd> + <kbd>.</kbd> (default VS Code shortcut)
- **Refactoring** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>R</kdb>
  - Windows / Linux: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>R</kbd>
- **Inline** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>I</kbd>
  - Windows / Linux: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>I</kbd>
- **Extract** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>X</kbd>
  - Windows / Linux: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>X</kbd>
- **Convert** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>V</kbd>
  - Windows / Linux: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>V</kbd>
- **Action** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>A</kbd>
  - Windows / Linux: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>A</kbd>  

## Refactor Context Menu Example

![Refactoring Context Menu Example](https://p42.ai/image/vscode/refactoring-menu.png)

## Refactoring Hints

Some P42 refactoring suggestions are also indicated as blue information underlines or hints in applicable code segments. They can be invoked as quick fixes. See Refactorings below for details.

![Nullish Coalescing Operator Example](https://p42.ai/image/vscode/feature-suggestion.png)

## Refactor Files and Folders in Bulk (P42+)

For files and folders in the Explorer, there is a new "Refactor... \[P42+\]" command that refactors files and folders in one go. You can select a refactoring from a dialog. The selected refactoring is then applied to the selected file or all files in the folder (and its subfolders).

This is a [P42+](https://p42.ai/p42-plus) feature. If you want to support the development of P42 and are interested in advanced functionality for teams, please check out [P42+ (for GitHub)](https://p42.ai/p42-plus).

### Recommended Bulk Refactoring Workflow

1. Get your workspace in a clean state, e.g. by committing or stashing your current changes or by switching to a clean branch.
2. Run the refactoring on the folders you want to update.
3. **Thoroughly review the individual changes in the diff viewer and revert or fix them as needed**. Modernizations need to cover many edge cases, so there is a chance that some changes may lose comments, break formatting, or affect the semantics. If you find bugs, please report them here: https://github.com/p42ai/refactor-vscode/issues
4. Run your test suites to ensure nothing broke unexpectedly.
5. Commit the changes.

![Refactor... Command](https://p42.ai/image/vscode/feature-refactor-menu.png)
![Refactor... Menu](https://p42.ai/image/vscode/feature-refactor-selector.png)

# Configuration

The 'p42.toml' file in the workspace root contains the P42 configuration.

Currently, individual refactorings can be enabled and disabled. By default, all refactorings are enabled.

## Disabling Refactorings

To disable a refactoring, add a section with "refactoring.$refactoring-id" and set enabled to false, for example:

```toml
[refactoring.optional-chaining]
enabled = false
```

The refactoring ids are displayed as grayed-out text in parentheses in the hover messages.

## Ignoring Statements

You can add a `// p42:ignore-next-statement` comment in a separate line before a statement to prevent P42 (for VS Code and for GitHub) from analysing the next statement and anything contained in it.

### Example

```js
if (example) {
  // p42:ignore-next-statement
  x = stringify(schema, { space: 2 }) + "\n";
}
```

In the above snippet, P42 will not analyse the statement `x = stringify(schema, { space: 2 }) + "\n";`.

## Ignoring Files

You can add a `// p42:ignore-file` comment at the beginning of the file (before the first code line). No suggestions etc. will be shown for ignored files.

# FAQ

- **Does P42 support Vue single file components?**
  No. P42 supports `.js`, `.mjs`, `.cjs`, `.jsx`, `.ts`, and `.tsx` files that contain TypeScript or JavaScript code (with or without JSX).

- **Does P42 support Flow type annotations?**
  No. P42 supports TypeScript.

- **Does P42 analyse my code in the P42 cloud?**
  No. When you use the P42 JavaScript Assistant for VS Code, your source code remains on your computer and all P42 code analysis happens on your computer. No code or other data is transferred to a cloud service by the P42 extension.

- **How can I disable a refactoring / suggestions?**
  You can disable them by adding a section in the `p42.config.toml` configuration file. See Configuration above.

# Legal
* 

```
This software is offered free of charge by
P42 Software UG (haftungsbeschränkt), Pappelallee 78/79, 10437 Berlin, Germany.

The software may not be redistributed or sold without permission.

P42 Software UG (haftungsbeschränkt) is only liable for defects in accordance with applicable law.
```

# Open Source Libraries

See [DISCLAIMER.txt](https://raw.githubusercontent.com/p42ai/refactor-vscode/main/DISCLAIMER.txt).

# Feedback & Updates

If you want to provide feedback, e.g., which refactorings or functions you'd like to see in P42, or if you'd like to receive updates, you can follow us on [Twitter @p42ai](https://twitter.com/p42ai) or [LinkedIn](https://www.linkedin.com/company/p42-software).
