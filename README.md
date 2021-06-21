# P42 Refactoring for Visual Studio Code (alpha)

Refactor opportunities are indicated as blue information underlines in applicable code segments.
They can be invoked as quick fixes or through the refactoring menu.

## Example

![Example](https://p42.ai/image/vscode/example.png)

## Refactorings

- Convert functions to arrow functions
- Convert 'var' variable declarations that can be block scoped to let and const
- Convert default value assignments to parameter default values
- Convert check of last string character to 'String.endsWith()
- Convert check for null and undefined into '== null' comparison
- Convert indexed for loop to for..of loop
- Shorten default value assignments with nullish coalescing operator
- Convert to optional chain expressions
- Convert '.apply()' call to use spread operator (...)
- Convert string concatenation to template literals
- Split combined variable declaration into separate declarations
- Combine nested if-statements into single if statement with '&&' condition
