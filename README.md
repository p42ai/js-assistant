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
    <a href="https://github.com/p42ai/refactor-vscode/issues">Report Bug</a>
    ·
    <a href="https://github.com/p42ai/refactor-vscode/issues">Request Feature</a>
    ·
    <a href="https://twitter.com/p42ai">Follow @p42ai</a>
  </p>
  
</div>


# Getting Started

P42 adds **[48 automated refactorings, cleanups, and code actions](https://p42.ai/documentation/code-action/) for JavaScript and TypeScript** to VS Code. The available actions depend on the cursor position, the selected text (if any), the source code, the language type, and any available type information. 

You can find available actions in the VS Code **quick fix and refactoring context menus** and in context menus for specific action types. In some situations, **refactoring hints with a blue squiggly underline** indicate beneficial actions that you can take. 

To help you refactor with confidence, P42 evaluates the impact on the logical program behavior and often shows **[refactoring safety information](#safety-evaluation)** in the context menu entry.

## Quickfix Context Menu
When P42 code actions are available, you will see a lightbulb in your editor. Clicking it will open the quickfix context menu. Alternatively, you can use a keyboard shortcut (see below).

![Quickfix menu](https://p42.ai/image/vscode/feature-lightbulb-quickfix-menu.gif)

## Refactoring Hints

 P42 suggests some refactorings with blue squiggly underlines in your editor. You can invoke them as a quick fix.

![Nullish Coalescing Operator Example](https://p42.ai/image/vscode/feature-suggestion.png)

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

# Safety Evaluation

The P42 JavaScript Assistant evaluates if refactorings can change the behavior of the code (within [limitations](#safety-evaluation-limitations)). The P42 context and quick-fix menu items often contain safety indicators:

* **No indicator**: P42 has not evaluated the safety of the refactoring or code action. No indicator is the default for code actions such as [adding console.log statements](https://p42.ai/documentation/code-action/insert-console-log) that intentionally change your program.
* **Safe** ✅: The refactoring will not change the behavior of your code.
* **Information** ℹ️: There are circumstances under which the refactoring can impact the behavior of your code. The menu item will include short hints at what you need to check to proceed safely.
* **Warning** ⚠️: Similar to information, but with a higher chance of introducing defects or potential defect severity.
* **Error** ❌: The refactoring will change the runtime behavior of your code and is likely to introduce defects. You might still want to proceed, particularly if you are already aware of the defect you will introduce and how to fix it, but proceed with caution.

## Safety Evaluation Limitations

When you are using TypeScript, the safety evaluation **relies on the accuracy of your type annotations**. If your type annotations are not accurate, some refactorings deemed safe by P42 might lead to the introduction of defects.

The safety evaluation **does not cover runtime performance**, which can be vital if you work on hotspot areas of your application. Refactorings might negatively impact the application performance in some cases.

For code modernizations, the safety evaluation also **relies on the correct behavior of the standard JavaScript functions**. If there are defects in the polyfills that you are using (for polyfilled functions), or if they implement a different behavior than the ECMAScript specification, modernizing the code can introduce defects.

The safety evaluation **analyzes single files without a larger type context**. Some indirect types that are resolved by TypeScript in your program might be considered as `any` or `unknown`. As a result, P42 might present warnings that are not relevant if you have the complete type information.

# Refactor Files and Folders in Bulk (P42+)

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
  No. P42 supports plain JavaScript, JSX and TypeScript.

- **Does P42 analyse my code in the P42 cloud?**
  No. When you use the P42 JavaScript Assistant for VS Code, your source code remains on your machine and all P42 code analysis happens on your machine. No code or other data is transferred to the P42 cloud service by the P42 JavaScript Assistent.

- **How can I disable a refactoring / suggestions?**
  You can disable them by adding a section in the `p42.config.toml` configuration file. See Configuration above.

# Used Open Source Libraries

See [DISCLAIMER.txt](https://raw.githubusercontent.com/p42ai/refactor-vscode/main/DISCLAIMER.txt).
