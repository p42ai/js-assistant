JavaScript Refactoring (P42) for VS Code adds **19 automated refactorings for modernizing and simplifying your JavaScript and TypeScript** code. The refactorings can be run on editor suggestions or as a codemod on all files in a folder.

# Overview

## Refactoring Menu

The P42 refactorings are shown as additional items in the VS code refactoring context menu:

![Refactoring Context Menu Example](https://p42.ai/image/vscode/refactoring-menu.png)

## Refactoring Suggestions in the Editor

Many P42 refactoring suggestions are also indicated as blue information underlines or hints in applicable code segments. They can be invoked as quick fixes. See Refactorings below for details.

![Nullish Coalescing Operator Example](https://p42.ai/image/vscode/nullish-coalescing-operator.png)

## Codemod: Bulk Refactoring for Folders

For folders in the Explorer, there is a new "Refactor... [P42]" command for bulk refactorings. You can select a code modernization refactoring from a dialog. The selected refactoring is then applied to the files in the folder.

![Folder Refactoring](https://p42.ai/image/vscode/feature-bulk-refactor-menu.png)

### Recommended Codemod Workflow

1. Get you workspace in a clean state, e.g. by committing or stashing current changes, or by switching to a clean branch.
2. Run the P42 code refactoring on the folders you want to update.
3. **Thoroughly review the individual changes in the diff viewer and revert / fix them as needed**. Refactorings need to cover many edge cases, so there is a chance that some changes may lose comments, break formatting, or affect the semantics. If you find bugs, please report them here: https://github.com/p42ai/refactor-vscode/issues
4. Run your test suites to ensure nothing broke unexpectedly.
5. Commit the changes.

# Refactorings

## Shorten default value assignments with nullish coalescing operator

![Nullish Coalescing Operator Example](https://p42.ai/image/vscode/nullish-coalescing-operator.png)

## Combine nested if-statements into single if statement with '&&' condition

![Nested If Example](https://p42.ai/image/vscode/nested-if.png)

## Combine nested single `if` inside `else` into `else if`

![Nested Else Example](https://p42.ai/image/vscode/nested-else.png)

## Convert default value assignments to parameter default values

![Default Parameter Example](https://p42.ai/image/vscode/default-parameter.png)

## Collapse object properties into shorthand notation

![Collapse Property into Shorthand Example](https://p42.ai/image/vscode/collapse-property-into-shorthand.png)

## Expand shorthand property notation(ad-hoc)

Available on shorthand properties (via the refactoring context menu).

## Convert check of first string character to 'String.startsWith()'

![String.startsWith() Example](https://p42.ai/image/vscode/string-starts-with.png)

## Convert check of last string character to 'String.endsWith()'

![String.endsWith() Example](https://p42.ai/image/vscode/ends-with.png)

## Convert indexed for loop to for..of loop

![For..of Loop Example](https://p42.ai/image/vscode/for-of-loop.png)

## Convert check for null and undefined into '== null' comparison

![== null Example](https://p42.ai/image/vscode/eq-eq-null.png)

## Combine return statements into a single return with a conditional expression

![Return Ternary Example](https://p42.ai/image/vscode/return-ternary.png)

## Split combined variable declaration into separate declarations

![Unchain Variable Declaration Example](https://p42.ai/image/vscode/unchain-variable-declaration.png)

## Convert to optional chain expressions

![Optional Chaining Example](https://p42.ai/image/vscode/optional-chaining.png)

## Convert '.apply()' call to use spread operator (...)

![Spread Operator Example](https://p42.ai/image/vscode/spread-syntax.png)

## Convert 'var' variable declarations that can be block scoped to let and const

![Block Scoped Variable Example](https://p42.ai/image/vscode/block-scoped-variable.png)

## Convert functions to arrow functions

![Arrow Function Example](https://p42.ai/image/vscode/arrow-function.png)

## Convert string concatenation to template literals

![Template Literal Example](https://p42.ai/image/vscode/template-literal.png)

## Flip if-else statement (ad-hoc)

Invert the if-statement condition and change the order of the then and else blocks.
Available inside if-else statements (via the refactoring context menu).

## Flip ternary expression (ad-hoc)

Invert the ternary condition and change the order of its first and second expression.
Available inside ternary (conditional) expressions (via the refactoring context menu).

# Configuration

The `p42.toml` file in the workspace root contains the P42 configuration.

Currently, individual refactorings can be enabled and disabled. By default, all refactorings are enabled.

To disable a refactoring, add a section with "refactoring.$refactoring-id" and set enabled to false, for example:

```
[refactoring.optional-chaining]
enabled = false
```

The refactoring ids are displayed as grayed-out text in parentheses in the hover messages.

# FAQ

- **Does P42 analyse my code in the P42 cloud?**
  No. Your code remains on your computer and all P42 code analysis happens on your computer. No code or other data is transferred to a cloud service by the P42 extension.

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
