The P42 JS Assistant adds **over 120 code actions** and a **suggestion panel** for **JavaScript**, **TypeScript**, **React**, and **Vue.js** to Visual Studio Code.

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
| **<ins>R</ins>efactor** |  *context menu* |  <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>R</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd> |
| **<ins>S</ins>ource Action** |  *context menu* |  <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>S</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>S</kbd> |
| **E<ins>x</ins>tract** |  *direct* |  <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>X</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>X</kbd> |
| **<ins>I</ins>nline** |  *direct* |  <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>I</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>I</kbd> |
| **Toggle <ins>B</ins>races {}** |  *direct* |  <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>B</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>B</kbd> |
| **Move Up** |  *direct* |  <kbd>⌃</kbd> + <kbd>⌥</kbd> + <kbd>↑</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>U</kbd> |
| **Move Down** |  *direct* |  <kbd>⌃</kbd> + <kbd>⌥</kbd> + <kbd>↓</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>J</kbd> |
| **Other <ins>A</ins>ction** |  *context menu* |  <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>A</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>A</kbd> |

## Touch Bar
The P42 JS Assistant adds the following buttons to the MacOS touch bar:
* ✏️ &nbsp;&nbsp;**Rename**: Triggers the rename command on the current symbol.
* 🪄 &nbsp;&nbsp;**Quick Fix**: Opens the quick-fix context menu.
* 🔧 &nbsp;&nbsp;**Refactor**: Opens the refactor context menu.
* 📄 &nbsp;&nbsp;**Source Action**: Opens the source action context menu.

# Code Assists by Category
Code assists that belong to several categories appear more than once.

## Core Refactorings
Visual Study Code already contains basic refactorings such as Rename and Extract Function. The JS Assistant adds additional refactorings or extended functionality such as safety checking:
* **Extract selected text into variable**: Extract the selected text (including expressions from template literals) into a `const` variable.
* **Extract variable**: Extract one or more occurrences of an expression into a `const` variable.
* **Replace assignment with return**: Convert a variable assignment to a `return` statement.
* **Inline variable**: Inline a variable value into its references.

## Code Assists for Logical Expressions
Boolean logic can be challenging to read, especially as expressions get more complex. The JS Assistant provides several refactorings that can help you simplify and tease apart logical expressions to make them easier to understand:
* **Convert string comparison chain to array.includes()**: Replace `|| value === 'aString'` and `&& value !== 'aString'`  chains with `array.includes()`.
* **Convert to optional chaining**: Replace various guard expressions with the optional chaining operator (`?.`).
* **Flip operator**: Swap the left and right operands and update the operator if necessary.
* **Invert condition**: Negate the condition of an if-statement or conditional expression and swap its content.
* **Pull up negation**: Move the not-operator (`!`) out of a binary expression.
* **Push down negation**: Push the not-operator (`!`) into an expression and negate it.
* **Remove double negation**: Remove double negation (`!!`) expressions.
* **Simplify binary expression**: Replace binary expression with a more straightforward equivalent expression.
* **Use == null comparison**: Replace different nullish checks with `== null`.

## Code Assists for Branching Statements
Branching statements such as if-else and switch are central elements in many programs. Restructuring them can increase the readability of your programs, often in combination with refactoring their conditions:
* **Add {…} to if-else and loops**: Convert single statements into blocks.
* **Convert && to if statement**: Convert `condition && aFunction();` and similar expression statements into if statements.
* **Convert conditional expression to if-else**: Convert a conditional expression to an if-else statement.
* **Convert if-else into conditional expression**: Convert an `if`-`else` return or assignment expression into a conditional expression.
* **Convert if-else to switch**: Convert a series of if-else statements with equality comparisons into a switch statement.
* **Convert switch to if-else**: Change a switch statement into a series of if-else statements
* **Inline variable occurrence**: Inline the value of a variable into one of its occurrences.
* **Introduce early return / continue**: Change an if-statement into an early return or continue statement.
* **Merge if-statement into preceding if-statement**: Merges two if-statements with the same body when possible.
* **Merge nested if inside else into else-if**: Nested single `if` statements inside `else` blocks can be combined into `else if` statements.
* **Merge nested if-statements**: Combine two nested `if` statements without additional operations into a single `if`-statement, using `&&` to combine the conditions.
* **Move duplicated first statement out of if-else**: Move a first statement that appears in both the if and the else block out of the if-else statement.
* **Move if-else-if branches**: Move an if-else branch up or down.
* **Move duplicated last statement out of if-else**: Move a last statement that appears in both the if and the else block out of the if-else statement.
* **Move nested if**: Push down if statements into nested if statements and pull nested if statements up.
* **Move switch case clause**: Move a `case` clause in a `switch` statement up or down.
* **Remove {…} from if-else and loops**: Replace single statement blocks with their inner statement.
* **Remove empty else block**: Remove an empty 'else' block from an 'if' statement.
* **Remove empty if block**: Remove an empty 'if' block from an 'if' statement. Replaces it with the 'else' block when available.
* **Remove redundant else if**: Remove redundant else-if conditions and unreachable else statements.
* **Remove unnecessary conditional expression**: Replace a conditional expression with its condition or its result.
* **Remove unnecessary else**: Lift the else content of an `if`-`else` with a return statement to the outer indentation level.
* **Separate repeated condition into nested if-else**: Separate a repeated sub-condition that is fully covered into a nested if-else.
* **Simplify switch statement**: Remove an unnecessary switch statement or replace it with its content.
* **Split if statement**: Split the condition of an if statement on `||` or `&&` when possible.

## Code Assists for Arrays and Loops
JavaScript has several ways of defining loops and many array methods that work on the whole array. The JS Assistant provides several code actions for converting between different types of for loops and for converting to more idiomatic array methods such as array.includes().
* **Convert array.filter()[0] to array.find()**: Replace `anArray.filter(…)[0]` with `anArray.find(…)`.
* **Convert array.indexOf() into array.includes()**: Replace `array.indexOf()` checks with `array.includes()`.
* **Convert string comparison chain to array.includes()**: Replace `|| value === 'aString'` and `&& value !== 'aString'`  chains with `array.includes()`.
* **Convert loop to .forEach**: Replace regular `for` loops with `.forEach()` loops.
* **Convert loop to for…of**: Replace regular `for` loops and `anArray.forEach` loops with `for…of` loops.
* **Convert loop to for**: Replace `for…of` with a regular `for` loop that has an index variable.
* **Convert loop to .map()**: Convert a loop with `.push()` into a `.map()` call.
* **Move array element**: Move an array element up or down.
* **Move object property**: Move an object property up or down.

## Code Assists for Functions and Methods
Functions and methods are essential building blocks of any non-trivial program. The following code actions make it easier to work with functions, methods, and their parameters:
* **Add {…} to arrow function**: Convert arrow function expression body into a block body.
* **Convert function to arrow function**: Replace function expressions with arrow functions, a more concise syntax.
* **Convert function to object method**: Convert property assignments with functions to method declarations.
* **Convert named function declaration to variable declaration**: Converts a named function to a const declaration with a function expression.
* **Move default value into parameter**: Replace default value assignment expressions with default parameter values.
* **Push parameter into IIFE/IIAF**: Push a parameter of an immediately-invoked function expressions (IIFEs) or an immediately-invoked arrow functions (IIAFs) into the function body.
* **Remove {…} from arrow function**: Convert an arrow function block body into an expression body.
* **Remove IIFE/IIAF**: Remove immediately-invoked function expressions (IIFEs) and immediately-invoked arrow functions (IIAFs) without parameters.

## Code Assists for Classes

* **Convert #-private to TypeScript private**: Replace ECMAScript #-private properties and methods with TypeScript private.
* **Convert TypeScript private to #-private**: Replace TypeScript private properties and methods with ECMAScript #-private.
* **Move field initialization into constructor**: Moves the assignment of the initial field value into the class constructor.
* **Move initialization into field declaration**: Moves the assignment of the initial field value into the field declaration.

## Code Assists for Strings and Template Literals
Text manipulation has become more powerful with the introduction of template literals in JavaScript. The JS Assistant offers several code actions to help you work with text, be it strings or template literals:
* **Convert string comparison chain to array.includes()**: Replace `|| value === 'aString'` and `&& value !== 'aString'`  chains with `array.includes()`.
* **Convert string to template literal**: Convert a string to a basic template literal without expressions.
* **Convert template literal to string**: Convert a simple template literal without expressions into a string.
* **Extract selected text into variable**: Extract the selected text (including expressions from template literals) into a `const` variable.
* **Inline into template**: Inline a string or a basic template literal into an outer template literal.
* **Remove unnecessary template literal**: Simplify a template literal with a single inner expression and no prefix or suffix.
* **Use string.endsWith()**: `string.endsWith()` checks if a string ends with another string.
* **Use string.startsWith()**: `string.startsWith()` checks if a string starts with another string.
* **Merge string concatenation**: Merge string and template literal concatenation into a single template literal or string.

## Code Assists for Variables

* **Convert destructuring to regular variable declaration**: Convert all variables that are declared via destructuring into separate regular variable declarations.
* **Convert let to const**: Replace `let` declarations that have no re-assignment with `const` declarations.
* **Convert 'new Array(…)' to '[…]'**: Replace `new Array(…)` calls with `[…]`.
* **Convert to destructuring assignment**: Convert a variable declaration that accesses an object property to a destructuring assignment.
* **Extract variable**: Extract one or more occurrences of an expression into a `const` variable.
* **Flatten array rest/spread property**: Merge a ...[] expression into the outer array literal or destructuring expression.
* **Replace assignment with return**: Convert a variable assignment to a `return` statement.
* **Move default value into parameter**: Replace default value assignment expressions with default parameter values.
* **Merge into preceding destructuring assignment**: Combine an object destructuring assignment with its preceding sibling.
* **Merge variable declaration and initialization**: Convert the initial assignment of a variable into its declaration initializer.
* **Move constant to top-level scope**: Move a constant to the top-level scope of the module.
* **Extract destructured expression into separate variable declaration**: Move a destructured expression inside a variable declaration into a separate variable declaration.
* **Move field initialization into constructor**: Moves the assignment of the initial field value into the class constructor.
* **Move initialization into field declaration**: Moves the assignment of the initial field value into the field declaration.
* **Move variable declaration**: Move a variable declaration up or down.
* **Push variable declaration into initial value**: Inlines a variable that is initialized with another variable into the declaration of that variable.
* **Push parameter into IIFE/IIAF**: Push a parameter of an immediately-invoked function expressions (IIFEs) or an immediately-invoked arrow functions (IIAFs) into the function body.
* **Remove trailing array destructuring holes**: Remove trailing array destructuring holes and empty array destructuring expressions.
* **Remove unused variable**: Remove a variable that is not read or written.
* **Replace with existing variable**: Replace an expression with an existing variable.
* **Convert var to let or const**: Replace `var` with block-scoped variables `let` and `const`.
* **Split variable declaration sequence**: Convert declarations with multiple variables into separate declarations for each variable.
* **Split variable declaration and initialization**: Separate the variable initialization from its declaration.
* **Use nullish coalescence in default expression**: Replace default value expression with nullish coalescing operator (`??`) expressions.

## Code Assists for Object and Array Destructuring

* **Convert destructuring to regular variable declaration**: Convert all variables that are declared via destructuring into separate regular variable declarations.
* **Convert to destructuring assignment**: Convert a variable declaration that accesses an object property to a destructuring assignment.
* **Merge into preceding destructuring assignment**: Combine an object destructuring assignment with its preceding sibling.
* **Move destructuring array element**: Move an element inside an array destructuring expression up or down.
* **Extract destructured expression into separate variable declaration**: Move a destructured expression inside a variable declaration into a separate variable declaration.
* **Move destructuring object property**: Move a property inside an object destructuring expression up or down.
* **Push variable declaration into initial value**: Inlines a variable that is initialized with another variable into the declaration of that variable.
* **Remove trailing array destructuring holes**: Remove trailing array destructuring holes and empty array destructuring expressions.

## Code Assists for Syntax Conversion
It is often annoying to make small syntactical changes by editing text. Often more than one position needs to be edited, and the code is broken during the edit, leading to incorrect errors and auto-completions that get in the way. You can execute the following syntax conversions with code assists:
* **Add {…} to if-else and loops**: Convert single statements into blocks.
* **Add {…} to arrow function**: Convert arrow function expression body into a block body.
* **Add {…} to case**: Surround case statements in a block.
* **Add {…} to JSX attribute**: Add `{…}` to JSX attribute string literal value.
* **Add numeric separator**: Increase the readability of long numbers and uncommon number formats by adding underscore separators.
* **Collapse JSX tag**: Convert an empty JSX tag into a self-closing tag.
* **Collapse object property into shorthand**: Shorten object properties when the property name is the same as the property value.
* **Convert property access to dot notation**: Convert bracket notation property access `o['a']` into dot notation property access `o.a`.
* **Convert property access to bracket notation**: Convert dot notation property access `o.a` into bracket notation property access `o['a']`.
* **Convert to ++ / --**: Convert an assignment expression into a `++` or `--` expression.
* **Expand JSX tag**: Expand a self-closing JSX tag.
* **Expand shorthand property**: Expand a shorthand object property (e.g. `{ a }`) to a regular property (e.g. `{ a: a }`).
* **Merge variable declaration and initialization**: Convert the initial assignment of a variable into its declaration initializer.
* **Pull operator out of assignment**: Move an operator out of an assignment into a binary expression.
* **Push operator into assignment**: Move an operator from a binary expression into an assignment operator, e.g., `+=`.
* **Remove {…} from if-else and loops**: Replace single statement blocks with their inner statement.
* **Remove {…} from arrow function**: Convert an arrow function block body into an expression body.
* **Remove {…} from case**: Replace blocks with their content
* **Remove {…} from JSX attribute**: Remove `{…}` from a JSX attribute expression value that contains a string literal.

## JavaScript Modernizations
The Javascript ecosystem is progressing rapidly. However, it is hard to keep codebases up-to-date with the newer JavaScript features, and codemods are not always an option due to their significant churn and potential for breakages. The JS Assistant supports both codemod-like mass code refactoring and more opportunistic code modernization for the following upgrades:
* **Add numeric separator**: Increase the readability of long numbers and uncommon number formats by adding underscore separators.
* **Collapse object property into shorthand**: Shorten object properties when the property name is the same as the property value.
* **Convert .apply() to spread syntax**: Replace `.apply()` calls with the spread operator `...`
* **Convert array.indexOf() into array.includes()**: Replace `array.indexOf()` checks with `array.includes()`.
* **Convert string comparison chain to array.includes()**: Replace `|| value === 'aString'` and `&& value !== 'aString'`  chains with `array.includes()`.
* **Convert function to arrow function**: Replace function expressions with arrow functions, a more concise syntax.
* **Convert function to object method**: Convert property assignments with functions to method declarations.
* **Convert loop to for…of**: Replace regular `for` loops and `anArray.forEach` loops with `for…of` loops.
* **Convert Math.pow to exponentiation operator**: Use the exponentiation operator `**` instead of `Math.pow()`.
* **Convert string to template literal**: Convert a string to a basic template literal without expressions.
* **Convert to destructuring assignment**: Convert a variable declaration that accesses an object property to a destructuring assignment.
* **Convert to optional chaining**: Replace various guard expressions with the optional chaining operator (`?.`).
* **Move default value into parameter**: Replace default value assignment expressions with default parameter values.
* **Convert var to let or const**: Replace `var` with block-scoped variables `let` and `const`.
* **Replace void 0 with undefined**: Replace `void 0` and other constant `void` expressions with `undefined`.
* **Use == null comparison**: Replace different nullish checks with `== null`.
* **Use nullish coalescence in default expression**: Replace default value expression with nullish coalescing operator (`??`) expressions.
* **Use string.endsWith()**: `string.endsWith()` checks if a string ends with another string.
* **Use string.startsWith()**: `string.startsWith()` checks if a string starts with another string.
* **Merge string concatenation**: Merge string and template literal concatenation into a single template literal or string.

## Code Assists for TypeScript

* **Convert Type[] to Array<Type>**: Change TypeScript array types into generic types.
* **Convert #-private to TypeScript private**: Replace ECMAScript #-private properties and methods with TypeScript private.
* **Convert TypeScript private to #-private**: Replace TypeScript private properties and methods with ECMAScript #-private.
* **Move interface member**: Move a property, constructor or method definition up or down.
* **Move type member**: Move a type member up or down.

## Code Assists for React
In React, components often contain JSX, a syntax extension for JavaScript. The JS Assistant provides code assists that make working with JSX and React easier:
* **Add {…} to JSX attribute**: Add `{…}` to JSX attribute string literal value.
* **Collapse JSX tag**: Convert an empty JSX tag into a self-closing tag.
* **Expand JSX tag**: Expand a self-closing JSX tag.
* **Extract React function component**: Extract JSX element or fragment into a React Function Component.
* **Move JSX attribute**: Move a JSX attribute up or down.
* **Remove {…} from JSX attribute**: Remove `{…}` from a JSX attribute expression value that contains a string literal.
* **Remove unnecessary JSX fragment**: Replace JSX Fragments `<></>` that only contain a single child with that child.
* **Surround with <>…</>**: Wrap JSX elements in a JSX fragment `<>…</>`.

## Lodash Modernizations
With the introduction of various collection helpers and new syntax in ES6 and more recent JavaScript versions, some Lodash functions have become somewhat redundant.
* **Replace _.every with array.every**: Replace Lodash `_.every` with `array.every`.
* **Replace _.filter with array.filter**: Replace Lodash `_.filter` with `array.filter`.
* **Replace _.each and _.forEach with array.forEach**: Replace Lodash `_.each` and `_.forEach` with `array.forEach`.
* **Replace _.map with array.map**: Replace Lodash `_.map` with `array.map`.
* **Replace _.noop with arrow Function**: Replace `_.noop` with `() => undefined`.
* **Replace _.some with array.some**: Replace Lodash `_.some` with `array.some`.

## Code Assists for Moving Semantic Blocks

* **Move array element**: Move an array element up or down.
* **Move class member**: Move a property, constructor, or method definition up or down.
* **Move constant to top-level scope**: Move a constant to the top-level scope of the module.
* **Move destructuring array element**: Move an element inside an array destructuring expression up or down.
* **Extract destructured expression into separate variable declaration**: Move a destructured expression inside a variable declaration into a separate variable declaration.
* **Move destructuring object property**: Move a property inside an object destructuring expression up or down.
* **Move field initialization into constructor**: Moves the assignment of the initial field value into the class constructor.
* **Move initialization into field declaration**: Moves the assignment of the initial field value into the field declaration.
* **Move duplicated first statement out of if-else**: Move a first statement that appears in both the if and the else block out of the if-else statement.
* **Move if-else-if branches**: Move an if-else branch up or down.
* **Move interface member**: Move a property, constructor or method definition up or down.
* **Move JSX attribute**: Move a JSX attribute up or down.
* **Move duplicated last statement out of if-else**: Move a last statement that appears in both the if and the else block out of the if-else statement.
* **Move nested if**: Push down if statements into nested if statements and pull nested if statements up.
* **Move object property**: Move an object property up or down.
* **Move statement**: Move a statement up or down.
* **Move switch case clause**: Move a `case` clause in a `switch` statement up or down.
* **Move type member**: Move a type member up or down.
* **Move variable declaration**: Move a variable declaration up or down.

## Code Cleanups
Code cleanups remove unnecessary code. Such code can result from code churn, e.g., by applying other refactorings, adding new features, or fixing bugs. The JS Assistant shows hints and automates the cleanup for the following situations:
* **Flatten array rest/spread property**: Merge a ...[] expression into the outer array literal or destructuring expression.
* **Remove console.log**: Remove console.log statement.
* **Remove double negation**: Remove double negation (`!!`) expressions.
* **Remove empty else block**: Remove an empty 'else' block from an 'if' statement.
* **Remove empty if block**: Remove an empty 'if' block from an 'if' statement. Replaces it with the 'else' block when available.
* **Remove IIFE/IIAF**: Remove immediately-invoked function expressions (IIFEs) and immediately-invoked arrow functions (IIAFs) without parameters.
* **Remove redundant else if**: Remove redundant else-if conditions and unreachable else statements.
* **Remove trailing array destructuring holes**: Remove trailing array destructuring holes and empty array destructuring expressions.
* **Remove unnecessary conditional expression**: Replace a conditional expression with its condition or its result.
* **Remove unnecessary else**: Lift the else content of an `if`-`else` with a return statement to the outer indentation level.
* **Remove unnecessary expression statement**: Remove an expression statement that has no side-effects.
* **Remove unnecessary JSX fragment**: Replace JSX Fragments `<></>` that only contain a single child with that child.
* **Remove unnecessary template literal**: Simplify a template literal with a single inner expression and no prefix or suffix.
* **Remove unused variable**: Remove a variable that is not read or written.
* **Replace void 0 with undefined**: Replace `void 0` and other constant `void` expressions with `undefined`.
* **Simplify binary expression**: Replace binary expression with a more straightforward equivalent expression.
* **Simplify switch statement**: Remove an unnecessary switch statement or replace it with its content.

## AI Actions
Actions that use the P42 Cloud AI (which needs to be enabled in the settings).


## Other Actions

* **Insert console.log for variable**: Insert a 'console.log' statement for a selected variable when possible.
* **Insert else statement**: Add an else statement to an existing if statement
* **Select expression occurrences**: Start a multi-cursor selection on several occurrences of the same expression.
* **Surround with if statement**: Surround a sequence of statements with an if-statement.
* **Surround with try…catch**: Surround a sequence of statements with a `try…catch` block.

# Report Bugs and Suggest Features

Please report any bugs or feature suggestions in the **[JS Assistant issue tracker](https://github.com/p42ai/refactor-vscode/issues)**.

# License & Used Open Source Libraries

See [DISCLAIMER.txt](https://raw.githubusercontent.com/p42ai/refactor-vscode/main/DISCLAIMER.txt).