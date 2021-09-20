The P42 JavaScript Assistant adds **32 automated refactorings and code actions for JavaScript and TypeScript**.

It enhances the VS Code refactoring context menu, shows refactoring suggestions in your editor, and can modernize complete files and folders in a single operation.

https://marketplace.visualstudio.com/items?itemName=p42ai.refactor

# Actions

## Code Restructuring

- **Inline const**: Inline the value of a const declaration into its references and remove the declaration
- **Extract const**: Extract (multiple) occurrences of an expression to a const in the enclosing block scope
- **Extract substring to const**: Extract the selected part of a string literal into a const
- **Inline return**: Inline returned variable that is assigned in if-else or switch statements into return statements.
- **Push operator into assignment** for variable self-assignments
- **Pull operator out of assignment**
- **Convert for loop to for..of loop**
- **Convert for loop to forEach loop**
- **Convert if-else to guard clause** (unnest else)
- **Surround statements with try...catch**

## Conditionals

- **Invert condition**: Invert the condition of if-else statements and of conditional expressions (and flip the content)
- **Flip operator**: Swap the argument order of a commutative binary operator (and update the operator when needed)
- **Push down not operator** (!) into &&, ||, !=, !==, ==, ===, <, <=, >, >=
- **Merge nested if-statements** into a single if statement with '&&' condition
- **Merge nested single 'if'** inside 'else' into 'else if'
- **Convert null and undefined check into '== null' comparison**
- **Combine return statements** into a single return with a conditional expression

## Code Modernization

- **Add numeric separator** '\_' to decimal, hex, binary, octal and big int literals (ES2021)
- **Shorten default value assignments with nullish coalescing operator** (ES2020)
- **Convert to optional chain expressions** (ES2020)
- **Convert Math.pow to exponentation operator \*\*** (ES2016)
- **Convert var to let and const** (ES2015)
- **Convert functions to arrow functions** (ES2015)
- **Convert property assignments with functions to method declarations** (ES2015)
- **Convert default value assignments to parameter default values** (ES2015)
- **Convert string concatenation to template literals** (ES2015)
- **Convert check of first string character to 'String.startsWith()'** (ES2015)
- **Convert check of last string character to 'String.endsWith()'** (ES2015)
- **Convert '.apply()' call to use spread operator** (...) (ES2015)

## Syntax Transformations

- **Split combined variable declaration into separate declarations**
- **Collapse object properties into shorthand notation**
- **Expand shorthand property notation**

Visual Studio Code comes with many refactorings out-of-the-box. Most refactorings that are part of VS Code will not be re-implemented in P42, including:

- Rename
- Extract function
- Extract method

The P42 refactorings are available in the refactoring context menu, as editor suggestions, and as folder bulk refactorings (see below).

# User Interface

## Refactor Context Menu

The P42 refactorings are shown as additional items in the VS Code "Refactor..." context menu:

![Refactoring Context Menu Example](https://p42.ai/image/vscode/refactoring-menu.png)

## Keyboard Shortcuts

- Inline const: `CTRL + ALT + N`

## Refactoring Hints

Many P42 refactoring suggestions are also indicated as blue information underlines or hints in applicable code segments. They can be invoked as quick fixes. See Refactorings below for details.

![Nullish Coalescing Operator Example](https://p42.ai/image/vscode/feature-suggestion.png)

## Modernize Files and Folders

For files and folders in the Explorer, there is a new "Modernize... \[P42\]" command that modernizes files and folders in one go. You can select a modernization refactoring from a dialog. The selected modernization is then applied to the selected file or all files in the folder (and its subfolders).

### Recommended Modernization Workflow

1. Get your workspace in a clean state, e.g. by committing or stashing your current changes or by switching to a clean branch.
2. Run the P42 code refactoring on the folders you want to update.
3. **Thoroughly review the individual changes in the diff viewer and revert or fix them as needed**. Modernizations need to cover many edge cases, so there is a chance that some changes may lose comments, break formatting, or affect the semantics. If you find bugs, please report them here: https://github.com/p42ai/refactor-vscode/issues
4. Run your test suites to ensure nothing broke unexpectedly.
5. Commit the changes.

![Modernize... Command](https://p42.ai/image/vscode/feature-modernize-menu.png)
![Modernize... Menu](https://p42.ai/image/vscode/feature-modernize-selector.png)

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

You can add a comment `// p42:ignore-next-statement` in a separate line before a statement to prevent P42 (for VS Code and for GitHub) from analysing the next statement and anything contained in it.

### Example

```js
if (example) {
  // p42:ignore-next-statement
  x = stringify(schema, { space: 2 }) + "\n";
}
```

In the above snippet, P42 will not analyse the statement `x = stringify(schema, { space: 2 }) + "\n";`.

# FAQ

- **Does P42 analyse my code in the P42 cloud?**
  No. When you use the P42 JavaScript Assistant for VS Code, your source code remains on your computer and all P42 code analysis happens on your computer. No code or other data is transferred to a cloud service by the P42 extension.

- **How can I disable a refactoring / suggestions?**
  You can disable them by adding a section in the `p42.config.toml` configuration file. See Configuration above.

# License

```
This software is offered free of charge by
P42 Software UG (haftungsbeschränkt), Pappelallee 78/79, 10437 Berlin, Germany.

The software may not be redistributed or sold without permission.

P42 Software UG (haftungsbeschränkt) is only liable for defects in accordance with applicable law.
```

# Open Source Libraries

See [DISCLAIMER.txt](https://raw.githubusercontent.com/p42ai/refactor-vscode/main/DISCLAIMER.txt).

# Feedback & Updates

If you want to provide feedback, e.g. which refactorings or functions you'd like to see in P42, or if you'd like to receive updates, you can follow us on [Twitter @p42ai](https://twitter.com/p42ai) or [LinkedIn](https://www.linkedin.com/company/p42-software).
