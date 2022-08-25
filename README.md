# JavaScript Refactoring Assistant
The P42 JavaScript Assistant adds **[89 automated refactorings and code assists](https://p42.ai/documentation/code-assist)** for **JavaScript**, **TypeScript**, and **React** to Visual Studio Code. 

> *[@p42ai makes refactoring a ton of fun ❤️](https://twitter.com/johnny_reilly/status/1526264716770803719)*&nbsp;&nbsp;&nbsp;— [John Reilly](https://twitter.com/johnny_reilly)

> *[Give it a try, it's awesome!](https://twitter.com/Idered/status/1448262441335468032)*&nbsp;&nbsp;— [Kasper Mikiewicz](https://twitter.com/Idered)

## Edit JavaScript Fast and Accurately
Manually editing your JavaScript code is often cumbersome and error-prone. With the P42 JavaScript Assistant, you can **use fast, automated code assists and refactorings to modify your code on a structural level** and focus on what change you want to make, not on what to type.

![Edit your code fast and accurately with the P42 JavaScript Assistant.](https://p42.ai/image/landing/benefit-edit-code-faster.gif)

## Learn Modern JavaScript On The Fly
JavaScript and its ecosystem are rapidly progressing, and it is time-consuming to keep up with the latest changes. The P42 JavaScript Assistant shows **suggestions for using up-to-date JavaScript syntax and APIs** so you can write clean, modern code without spending time reading blog posts and watching tutorial videos.

![Learn modern JavaScript with the P42 JavaScript Assistant.](https://p42.ai/image/landing/benefit-learn-modern-javascript.gif)
## Refactor Safely
Refactorings, especially those that are performed manually, can easily break existing functionality or introduce bugs. The **JavaScript Assistant automates refactoring steps and analyses the safety of potential refactorings**, so you can refactor with confidence and know what to consider to avoid unnecessary breakages.

![Learn modern JavaScript with the P42 JavaScript Assistant.](https://p42.ai/image/landing/benefit-prevent-introducing-bugs.gif)

# Documentation

You can find the actions in the **quick fix** and **refactoring context menus**. They depend on  the cursor position, the selected text (if any), the source code, the language type, and any available type information.
**Underlining with three dots** suggests beneficial [refactorings](https://p42.ai///documentation/p42-for-vscode/editor-integration#refactoring-suggestions) that you can perform. The [**suggestion sidebar**](https://p42.ai//documentation/p42-for-vscode/suggestion-sidebar) shows you recommended refactorings for your whole file.

## Keyboard Shortcuts
See also [Documentation](https://p42.ai/documentation/p42-for-vscode) / [Editor Integration](https://p42.ai/documentation/p42-for-vscode/editor-integration) / [Keyboard Shortcuts](https://p42.ai/documentation/p42-for-vscode/editor-integration#keyboard-shortcuts).

| Action | Type | Mac Shortcut | Windows/Linux Shortcut |
| ----------| --- | ------------ | ------------ |
| **Quick Fix** | *context menu* | <kbd>⌘</kbd> + <kbd>.</kbd> | <kbd>Ctrl</kbd> + <kbd>.</kbd> |
| **Refactor** | *context menu* | <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>R</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd> |
| **Extract** | *context menu* | <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>X</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>X</kbd> |
| **Inline** | *context menu* | <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>I</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>I</kbd> |
| **Inline** | *direct* | <kbd>⌃</kbd> + <kbd>⇧</kbd> + <kbd>⌘</kbd> + <kbd>I</kbd> | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>Alt</kbd> + <kbd>I</kbd> |
| **Convert** | *context menu* | <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>V</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>V</kbd> |
| **Toggle {}** | *direct* | <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>B</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>B</kbd> |
| **Move** | *context menu* | <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>M</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>M</kbd> |
| **Move Up** | *direct* | <kbd>⌃</kbd> + <kbd>⌥</kbd> + <kbd>↑</kbd> | <kbd>⇧</kbd> + <kbd>Alt</kbd> + <kbd>↑</kbd> |
| **Move Down** | *direct* | <kbd>⌃</kbd> + <kbd>⌥</kbd> + <kbd>↓</kbd> | <kbd>⇧</kbd> + <kbd>Alt</kbd> + <kbd>↓</kbd> |
| **Action** | *context menu* | <kbd>⌃</kbd> + <kbd>⌘</kbd> + <kbd>A</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>A</kbd> |

## Learn more
* [Editor Integration](https://p42.ai/documentation/p42-for-vscode/editor-integration)
* [Suggestion Sidebar](https://p42.ai/documentation/p42-for-vscode/suggestion-sidebar)
* [Safety Analysis](https://p42.ai/documentation/p42-for-vscode/safety-analysis)
* [Configuration](https://p42.ai/documentation/p42-for-vscode/configuration)
* [FAQ](https://p42.ai/documentation/p42-for-vscode/faq)

<div align="center">
  <p align="center">
    <img src="https://p42.ai/image/vscode/vscode-header.gif" alt="P42 JavaScript Assistant" />
    <br />
    <a href="https://github.com/p42ai/refactor-vscode/issues">Report Bug</a>
    ·
    <a href="https://github.com/p42ai/refactor-vscode/issues">Request Feature</a>
    ·
    <a href="https://twitter.com/p42ai">Follow @p42ai</a>
  </p>
</div>

# Premium Features
Developing the JavaScript Assistant extension takes significant time and effort. 
To make continued development sustainable,
some premium features and refactorings are only available in the Pro and Business plans: 

* [24 additional code assists](https://p42.ai/documentation/code-assist-list/pro)
* [Mass refactoring](https://p42.ai/documentation/p42-for-vscode/mass-refactoring)
* [Apply all safe suggestions](https://p42.ai/documentation/p42-for-vscode/suggestion-sidebar#apply-all-safe-suggestions)
* [Vue.js support](https://p42.ai/feature/vuejs)

You can [try P42 Pro 14 days for free](https://p42.ai/pricing).

# Code Assists by Category
Code assists that belong to several categories appear more than once.

## Core Refactorings
Visual Study Code already contains basic refactorings such as Rename and Extract Function. The JavaScript Assistant adds additional refactorings or extended functionality such as safety checking:
* **[Extract selected text into variable](https://p42.ai/documentation/code-assist/extract-substring-to-variable)**: Extract the selected text (including expressions from template literals) into a `const` variable.
* **[Extract variable](https://p42.ai/documentation/code-assist/extract-variable)**: Extract one or more occurrences of an expression into a `const` variable.
* **[Inline return](https://p42.ai/documentation/code-assist/inline-return)**: Convert a variable assignment to a `return` statement.
* **[Inline variable](https://p42.ai/documentation/code-assist/inline-variable)**: Inline a variable value into its references.

## Code Assists for Logical Expressions
Boolean logic can be challenging to read, especially as expressions get more complex. The JavaScript Assistant provides several refactorings that can help you simplify and tease apart logical expressions to make them easier to understand:
* **[Convert string comparison chain to array.includes()](https://p42.ai/documentation/code-assist/convert-comparison-chain-to-array-includes)**: Replace `|| value === 'aString'` and `&& value !== 'aString'`  chains with `array.includes()`.
* **[Convert to optional chaining](https://p42.ai/documentation/code-assist/convert-to-optional-chaining)**: Replace various guard expressions with the optional chaining operator (`?.`).
* **[Flip operator](https://p42.ai/documentation/code-assist/flip-operator)**: Swap the left and right operands and update the operator if necessary.
* **[Invert condition](https://p42.ai/documentation/code-assist/invert-condition)**: Negate the condition of an if-statement or conditional expression and swap its content.
* **[Pull up negation](https://p42.ai/documentation/code-assist/pull-up-negation)**: Move the not-operator (`!`) out of a binary expression.
* **[Push down negation](https://p42.ai/documentation/code-assist/push-down-negation)**: Push the not-operator (`!`) into an expression and negate it.
* **[Remove double negation](https://p42.ai/documentation/code-assist/remove-double-negation)**: Remove double negation (`!!`) expressions.
* **[Simplify binary expression](https://p42.ai/documentation/code-assist/simplify-binary-expression)**: Replace binary expression with a more straightforward equivalent expression.
* **[Use == null comparison](https://p42.ai/documentation/code-assist/use-eq-eq-null)**: Replace different nullish checks with `== null`.

## Code Assists for Branching Statements
Branching statements such as if-else and switch are central elements in many programs. Restructuring them can increase the readability of your programs, often in combination with refactoring their conditions:
* **[Add {…} to if-else and loops](https://p42.ai/documentation/code-assist/add-braces)**: Convert single statements into blocks.
* **[Convert && to if statement](https://p42.ai/documentation/code-assist/convert-and-and-guard-to-if-statement)**: Convert `condition && aFunction();` and similar expression statements into if statements.
* **[Convert conditional expression to if-else](https://p42.ai/documentation/code-assist/convert-conditional-expression-to-if-else)**: Convert a conditional expression to an if-else statement.
* **[Convert if-else into conditional expression](https://p42.ai/documentation/code-assist/convert-if-else-to-conditional-expression)**: Convert an `if`-`else` return or assignment expression into a conditional expression.
* **[Convert if-else to switch](https://p42.ai/documentation/code-assist/convert-if-else-to-switch)**: Convert if-else statement chain with equality comparisons to switch statement.
* **[Introduce early return / continue](https://p42.ai/documentation/code-assist/introduce-early-return) ([Pro](https://p42.ai/pricing))**: Change an if-statement into an early return or continue statement.
* **[Merge nested if inside else into else-if](https://p42.ai/documentation/code-assist/merge-nested-else-if)**: Nested single `if` statements inside `else` blocks can be combined into `else if` statements.
* **[Merge nested if-statements](https://p42.ai/documentation/code-assist/merge-nested-if)**: Combine two nested `if` statements without additional operations into a single `if`-statement, using `&&` to combine the conditions.
* **[Move duplicated first statement out of if-else](https://p42.ai/documentation/code-assist/move-first-statement-out-of-if-else)**: Move a first statement that appears in both the if and the else block out of the if-else statement.
* **[Move if-else-if branches](https://p42.ai/documentation/code-assist/move-if-else-if-branches) ([Pro](https://p42.ai/pricing))**: Move an if-else branch up or down.
* **[Move duplicated last statement out of if-else](https://p42.ai/documentation/code-assist/move-last-statement-out-of-if-else)**: Move a last statement that appears in both the if and the else block out of the if-else statement.
* **[Move nested if](https://p42.ai/documentation/code-assist/move-nested-if)**: Push down if statements into nested if statements and pull nested if statements up.
* **[Move switch case clause](https://p42.ai/documentation/code-assist/move-switch-case) ([Pro](https://p42.ai/pricing))**: Move a `case` clause in a `switch` statement up or down.
* **[Remove {…} from if-else and loops](https://p42.ai/documentation/code-assist/remove-braces)**: Replace single statement blocks with their inner statement.
* **[Remove empty else block](https://p42.ai/documentation/code-assist/remove-empty-else-block)**: Remove an empty 'else' block from an 'if' statement.
* **[Remove empty if block](https://p42.ai/documentation/code-assist/remove-empty-if-block)**: Remove an empty 'if' block from an 'if' statement. Replaces it with the 'else' block when available.
* **[Remove redundant else if](https://p42.ai/documentation/code-assist/remove-redundant-else)**: Remove redundant else-if conditions and unreachable else statements.
* **[Remove unnecessary conditional expression](https://p42.ai/documentation/code-assist/remove-unnecessary-conditional-expression)**: Replace a conditional expression with its condition or its result.
* **[Remove unnecessary else](https://p42.ai/documentation/code-assist/remove-unnecessary-else)**: Lift the else content of an `if`-`else` with a return statement to the outer indentation level.
* **[Separate repeated condition into nested if-else](https://p42.ai/documentation/code-assist/separate-condition-into-nested-if)**: Separate a repeated sub-condition that is fully covered into a nested if-else.
* **[Split if statement](https://p42.ai/documentation/code-assist/split-if)**: Split the condition of an if statement on `||` or `&&` when possible.

## Code Assists for Arrays and Loops
JavaScript has several ways of defining loops and many array methods that work on the whole array. The JavaScript Assistant provides several code actions for converting between different types of for loops and for converting to more idiomatic array methods such as array.includes().
* **[Convert array.filter()[0] to array.find()](https://p42.ai/documentation/code-assist/convert-array-filter-to-find) ([Pro](https://p42.ai/pricing))**: Replace `anArray.filter(…)[0]` with `anArray.find(…)`.
* **[Convert array.indexOf() into array.includes()](https://p42.ai/documentation/code-assist/convert-array-index-of-to-array-includes)**: Replace `array.indexOf()` checks with `array.includes()`.
* **[Convert string comparison chain to array.includes()](https://p42.ai/documentation/code-assist/convert-comparison-chain-to-array-includes)**: Replace `|| value === 'aString'` and `&& value !== 'aString'`  chains with `array.includes()`.
* **[Convert loop to .forEach](https://p42.ai/documentation/code-assist/convert-loop-to-for-each)**: Replace regular `for` loops with `.forEach()` loops.
* **[Convert loop to for…of](https://p42.ai/documentation/code-assist/convert-loop-to-for-of)**: Replace regular `for` loops and `anArray.forEach` loops with `for…of` loops.
* **[Convert loop to for](https://p42.ai/documentation/code-assist/convert-loop-to-for-with-index)**: Replace `for…of` with a regular `for` loop that has an index variable.
* **[Convert loop to .map()](https://p42.ai/documentation/code-assist/convert-loop-to-map) ([Pro](https://p42.ai/pricing))**: Convert a loop with `.push()` into a `.map()` call.
* **[Move array element](https://p42.ai/documentation/code-assist/move-array-element)**: Move an array element up or down.
* **[Move object property](https://p42.ai/documentation/code-assist/move-object-property)**: Move an object property up or down.

## Code Assists for Functions and Methods
Functions and methods are essential building blocks of any non-trivial program. The following code actions make it easier to work with functions, methods, and their parameters:
* **[Add {…} to arrow function](https://p42.ai/documentation/code-assist/add-braces-to-arrow-function)**: Convert arrow function expression body into a block body.
* **[Convert function to arrow function](https://p42.ai/documentation/code-assist/convert-function-to-arrow-function)**: Replace function expressions with arrow functions, a more concise syntax.
* **[Convert function to object method](https://p42.ai/documentation/code-assist/convert-function-to-object-method)**: Convert property assignments with functions to method declarations.
* **[Convert named function to function expression](https://p42.ai/documentation/code-assist/convert-named-function-to-function-expression)**: Converts a named function to a const declaration with a function expression.
* **[Move default value into parameter](https://p42.ai/documentation/code-assist/lift-default-into-parameter)**: Replace default value assignment expressions with default parameter values.
* **[Push parameter into IIFE/IIAF](https://p42.ai/documentation/code-assist/push-parameter-into-iife)**: Push a parameter of an immediately-invoked function expressions (IIFEs) or an immediately-invoked arrow functions (IIAFs) into the function body.
* **[Remove {…} from arrow function](https://p42.ai/documentation/code-assist/remove-braces-from-arrow-function)**: Convert an arrow function block body into an expression body.
* **[Remove IIFE/IIAF](https://p42.ai/documentation/code-assist/remove-iife)**: Remove immediately-invoked function expressions (IIFEs) and immediately-invoked arrow functions (IIAFs) without parameters.

## Code Assists for Classes

* **[Move field initialization into constructor](https://p42.ai/documentation/code-assist/move-field-initializer-into-constructor) ([Pro](https://p42.ai/pricing))**: Moves the assignment of the initial field value into the class constructor.
* **[Move initialization into field declaration](https://p42.ai/documentation/code-assist/move-field-initializer-into-declaration) ([Pro](https://p42.ai/pricing))**: Moves the assignment of the initial field value into the field declaration.

## Code Assists for Strings and Template Literals
Text manipulation has become more powerful with the introduction of template literals in JavaScript. The JavaScript Assistant offers several code actions to help you work with text, be it strings or template literals:
* **[Convert string comparison chain to array.includes()](https://p42.ai/documentation/code-assist/convert-comparison-chain-to-array-includes)**: Replace `|| value === 'aString'` and `&& value !== 'aString'`  chains with `array.includes()`.
* **[Convert string to template literal](https://p42.ai/documentation/code-assist/convert-string-to-template-literal)**: Convert a string to a basic template literal without expressions.
* **[Convert template literal to string](https://p42.ai/documentation/code-assist/convert-template-literal-to-string)**: Convert a simple template literal without expressions into a string.
* **[Extract selected text into variable](https://p42.ai/documentation/code-assist/extract-substring-to-variable)**: Extract the selected text (including expressions from template literals) into a `const` variable.
* **[Inline into template](https://p42.ai/documentation/code-assist/inline-into-template)**: Inline a string or a basic template literal into an outer template literal.
* **[Remove unnecessary template literal](https://p42.ai/documentation/code-assist/remove-unnecessary-template)**: Simplify a template literal with a single inner expression and no prefix or suffix.
* **[Use string.endsWith()](https://p42.ai/documentation/code-assist/use-string-ends-with)**: `string.endsWith()` checks if a string ends with another string.
* **[Use string.startsWith()](https://p42.ai/documentation/code-assist/use-string-starts-with)**: `string.startsWith()` checks if a string starts with another string.
* **[Merge string concatenation](https://p42.ai/documentation/code-assist/use-template-literal)**: Merge string and template literal concatenation into a single template literal or string.

## Code Assists for Variables

* **[Convert destructuring to regular variable declaration](https://p42.ai/documentation/code-assist/convert-destructured-to-regular-declaration) ([Pro](https://p42.ai/pricing))**: Convert all variables that are declared via destructuring into separate regular variable declarations.
* **[Convert let to const](https://p42.ai/documentation/code-assist/convert-let-to-const)**: Replace `let` declarations that have no re-assignment with `const` declarations.
* **[Convert 'new Array(…)' to '[…]'](https://p42.ai/documentation/code-assist/convert-new-array-to-array-literal) ([Pro](https://p42.ai/pricing))**: Replace `new Array(…)` calls with `[…]`.
* **[Convert to destructuring assignment](https://p42.ai/documentation/code-assist/convert-to-destructuring-assignment)**: Convert a variable declaration that accesses an object property to a destructuring assignment.
* **[Extract variable](https://p42.ai/documentation/code-assist/extract-variable)**: Extract one or more occurrences of an expression into a `const` variable.
* **[Flatten array rest/spread property](https://p42.ai/documentation/code-assist/flatten-array-rest-property) ([Pro](https://p42.ai/pricing))**: Merge a ...[] expression into the outer array literal or destructuring expression.
* **[Inline return](https://p42.ai/documentation/code-assist/inline-return)**: Convert a variable assignment to a `return` statement.
* **[Move default value into parameter](https://p42.ai/documentation/code-assist/lift-default-into-parameter)**: Replace default value assignment expressions with default parameter values.
* **[Merge into preceding destructuring assignment](https://p42.ai/documentation/code-assist/merge-into-preceding-destructuring-assignment)**: Combine an object destructuring assignment with its preceding sibling.
* **[Merge variable declaration and initialization](https://p42.ai/documentation/code-assist/merge-variable-declaration-and-initialization)**: Convert the initial assignment of a variable into its declaration initializer.
* **[Move const to top-level scope](https://p42.ai/documentation/code-assist/move-const-to-outer-scope) ([Pro](https://p42.ai/pricing))**: Move a constant to the top-level scope of the module.
* **[Move destructured expression into separate statement](https://p42.ai/documentation/code-assist/move-destructured-expression-into-separate-statement) ([Pro](https://p42.ai/pricing))**: Move a destructured expression inside a variable declaration into a separate variable declaration.
* **[Move field initialization into constructor](https://p42.ai/documentation/code-assist/move-field-initializer-into-constructor) ([Pro](https://p42.ai/pricing))**: Moves the assignment of the initial field value into the class constructor.
* **[Move initialization into field declaration](https://p42.ai/documentation/code-assist/move-field-initializer-into-declaration) ([Pro](https://p42.ai/pricing))**: Moves the assignment of the initial field value into the field declaration.
* **[Move variable declaration](https://p42.ai/documentation/code-assist/move-variable-declaration) ([Pro](https://p42.ai/pricing))**: Move a variable declaration up or down.
* **[Push variable declaration into initial value](https://p42.ai/documentation/code-assist/push-into-initial-value-declaration) ([Pro](https://p42.ai/pricing))**: Inlines a variable that is initialized with another variable into the declaration of that variable.
* **[Push parameter into IIFE/IIAF](https://p42.ai/documentation/code-assist/push-parameter-into-iife)**: Push a parameter of an immediately-invoked function expressions (IIFEs) or an immediately-invoked arrow functions (IIAFs) into the function body.
* **[Remove trailing array destructuring holes](https://p42.ai/documentation/code-assist/remove-trailing-array-destructuring-holes)**: Remove trailing array destructuring holes and empty array destructuring expressions.
* **[Remove unused variable](https://p42.ai/documentation/code-assist/remove-unused-variable)**: Remove a variable that is not read or written.
* **[Replace with existing variable](https://p42.ai/documentation/code-assist/replace-expression-with-existing-variable) ([Pro](https://p42.ai/pricing))**: Replace an expression with an existing variable.
* **[Convert var to let or const](https://p42.ai/documentation/code-assist/replace-var-with-let-and-const)**: Replace `var` with block-scoped variables `let` and `const`.
* **[Split variable declaration sequence](https://p42.ai/documentation/code-assist/split-variable-declaration)**: Convert declarations with multiple variables into separate declarations for each variable.
* **[Split variable declaration and initialization](https://p42.ai/documentation/code-assist/split-variable-declaration-and-initialization)**: Separate the variable initialization from its declaration.
* **[Use nullish coalescence in default expression](https://p42.ai/documentation/code-assist/use-nullish-coalescence-in-default-expression)**: Replace default value expression with nullish coalescing operator (`??`) expressions.

## Code Assists for Object and Array Destructuring

* **[Convert destructuring to regular variable declaration](https://p42.ai/documentation/code-assist/convert-destructured-to-regular-declaration) ([Pro](https://p42.ai/pricing))**: Convert all variables that are declared via destructuring into separate regular variable declarations.
* **[Convert to destructuring assignment](https://p42.ai/documentation/code-assist/convert-to-destructuring-assignment)**: Convert a variable declaration that accesses an object property to a destructuring assignment.
* **[Merge into preceding destructuring assignment](https://p42.ai/documentation/code-assist/merge-into-preceding-destructuring-assignment)**: Combine an object destructuring assignment with its preceding sibling.
* **[Move destructuring array element](https://p42.ai/documentation/code-assist/move-destructured-array-element)**: Move an element inside an array destructuring expression up or down.
* **[Move destructured expression into separate statement](https://p42.ai/documentation/code-assist/move-destructured-expression-into-separate-statement) ([Pro](https://p42.ai/pricing))**: Move a destructured expression inside a variable declaration into a separate variable declaration.
* **[Move destructuring object property](https://p42.ai/documentation/code-assist/move-destructured-object-property)**: Move a property inside an object destructuring expression up or down.
* **[Push variable declaration into initial value](https://p42.ai/documentation/code-assist/push-into-initial-value-declaration) ([Pro](https://p42.ai/pricing))**: Inlines a variable that is initialized with another variable into the declaration of that variable.
* **[Remove trailing array destructuring holes](https://p42.ai/documentation/code-assist/remove-trailing-array-destructuring-holes)**: Remove trailing array destructuring holes and empty array destructuring expressions.

## Code Assists for Syntax Conversion
It is often annoying to make small syntactical changes by editing text. Often more than one position needs to be edited, and the code is broken during the edit, leading to incorrect errors and auto-completions that get in the way. You can execute the following syntax conversions with code assists:
* **[Add {…} to if-else and loops](https://p42.ai/documentation/code-assist/add-braces)**: Convert single statements into blocks.
* **[Add {…} to arrow function](https://p42.ai/documentation/code-assist/add-braces-to-arrow-function)**: Convert arrow function expression body into a block body.
* **[Add {…} to JSX attribute](https://p42.ai/documentation/code-assist/add-braces-to-jsx-attribute)**: Add `{…}` to JSX attribute string literal value.
* **[Add numeric separator](https://p42.ai/documentation/code-assist/add-numeric-separator)**: Increase the readability of long numbers and uncommon number formats by adding underscore separators.
* **[Collapse JSX tag](https://p42.ai/documentation/code-assist/collapse-jsx-element)**: Convert an empty JSX tag into a self-closing tag.
* **[Collapse object property into shorthand](https://p42.ai/documentation/code-assist/collapse-property-into-shorthand)**: Shorten object properties when the property name is the same as the property value.
* **[Convert property access to dot notation](https://p42.ai/documentation/code-assist/convert-bracket-notation-property-access-to-dot-notation)**: Convert bracket notation property access `o['a']` into dot notation property access `o.a`.
* **[Convert property access to bracket notation](https://p42.ai/documentation/code-assist/convert-dot-notation-property-access-to-bracket-notation)**: Convert dot notation property access `o.a` into bracket notation property access `o['a']`.
* **[Convert to ++ / --](https://p42.ai/documentation/code-assist/convert-to-increment)**: Convert an assignment expression into a `++` or `--` expression.
* **[Expand JSX tag](https://p42.ai/documentation/code-assist/expand-self-closing-jsx-element)**: Expand a self-closing JSX tag.
* **[Expand shorthand property](https://p42.ai/documentation/code-assist/expand-shorthand-property)**: Expand a shorthand object property (e.g. `{ a }`) to a regular property (e.g. `{ a: a }`).
* **[Merge variable declaration and initialization](https://p42.ai/documentation/code-assist/merge-variable-declaration-and-initialization)**: Convert the initial assignment of a variable into its declaration initializer.
* **[Pull operator out of assignment](https://p42.ai/documentation/code-assist/pull-operator-out-of-assignment)**: Move an operator out of an assignment into a binary expression.
* **[Push operator into assignment](https://p42.ai/documentation/code-assist/push-operator-into-assignment)**: Move an operator from a binary expression into an assignment operator, e.g., `+=`.
* **[Remove {…} from if-else and loops](https://p42.ai/documentation/code-assist/remove-braces)**: Replace single statement blocks with their inner statement.
* **[Remove {…} from arrow function](https://p42.ai/documentation/code-assist/remove-braces-from-arrow-function)**: Convert an arrow function block body into an expression body.
* **[Remove {…} from JSX attribute](https://p42.ai/documentation/code-assist/remove-braces-from-jsx-attribute)**: Remove `{…}` from a JSX attribute expression value that contains a string literal.

## JavaScript Modernizations
The Javascript ecosystem is progressing rapidly. However, it is hard to keep codebases up-to-date with the newer JavaScript features, and codemods are not always an option due to their significant churn and potential for breakages. The JavaScript Assistant supports both codemod-like mass code refactoring and more opportunistic code modernization for the following upgrades:
* **[Add numeric separator](https://p42.ai/documentation/code-assist/add-numeric-separator)**: Increase the readability of long numbers and uncommon number formats by adding underscore separators.
* **[Collapse object property into shorthand](https://p42.ai/documentation/code-assist/collapse-property-into-shorthand)**: Shorten object properties when the property name is the same as the property value.
* **[Convert .apply() to spread syntax](https://p42.ai/documentation/code-assist/convert-apply-to-spread-syntax)**: Replace `.apply()` calls with the spread operator `...`
* **[Convert array.indexOf() into array.includes()](https://p42.ai/documentation/code-assist/convert-array-index-of-to-array-includes)**: Replace `array.indexOf()` checks with `array.includes()`.
* **[Convert string comparison chain to array.includes()](https://p42.ai/documentation/code-assist/convert-comparison-chain-to-array-includes)**: Replace `|| value === 'aString'` and `&& value !== 'aString'`  chains with `array.includes()`.
* **[Convert function to arrow function](https://p42.ai/documentation/code-assist/convert-function-to-arrow-function)**: Replace function expressions with arrow functions, a more concise syntax.
* **[Convert function to object method](https://p42.ai/documentation/code-assist/convert-function-to-object-method)**: Convert property assignments with functions to method declarations.
* **[Convert loop to for…of](https://p42.ai/documentation/code-assist/convert-loop-to-for-of)**: Replace regular `for` loops and `anArray.forEach` loops with `for…of` loops.
* **[Convert Math.pow to exponentiation operator](https://p42.ai/documentation/code-assist/convert-math-pow-to-exponentiation)**: Use the exponentiation operator `**` instead of `Math.pow()`.
* **[Convert string to template literal](https://p42.ai/documentation/code-assist/convert-string-to-template-literal)**: Convert a string to a basic template literal without expressions.
* **[Convert to destructuring assignment](https://p42.ai/documentation/code-assist/convert-to-destructuring-assignment)**: Convert a variable declaration that accesses an object property to a destructuring assignment.
* **[Convert to optional chaining](https://p42.ai/documentation/code-assist/convert-to-optional-chaining)**: Replace various guard expressions with the optional chaining operator (`?.`).
* **[Move default value into parameter](https://p42.ai/documentation/code-assist/lift-default-into-parameter)**: Replace default value assignment expressions with default parameter values.
* **[Convert var to let or const](https://p42.ai/documentation/code-assist/replace-var-with-let-and-const)**: Replace `var` with block-scoped variables `let` and `const`.
* **[Replace void 0 with undefined](https://p42.ai/documentation/code-assist/replace-void-0-with-undefined)**: Replace `void 0` and other constant `void` expressions with `undefined`.
* **[Use == null comparison](https://p42.ai/documentation/code-assist/use-eq-eq-null)**: Replace different nullish checks with `== null`.
* **[Use nullish coalescence in default expression](https://p42.ai/documentation/code-assist/use-nullish-coalescence-in-default-expression)**: Replace default value expression with nullish coalescing operator (`??`) expressions.
* **[Use string.endsWith()](https://p42.ai/documentation/code-assist/use-string-ends-with)**: `string.endsWith()` checks if a string ends with another string.
* **[Use string.startsWith()](https://p42.ai/documentation/code-assist/use-string-starts-with)**: `string.startsWith()` checks if a string starts with another string.
* **[Merge string concatenation](https://p42.ai/documentation/code-assist/use-template-literal)**: Merge string and template literal concatenation into a single template literal or string.

## Code Assists for React
In React, components often contain JSX, a syntax extension for JavaScript. The JavaScript Assistant provides code assists that make working with JSX and React easier:
* **[Add {…} to JSX attribute](https://p42.ai/documentation/code-assist/add-braces-to-jsx-attribute)**: Add `{…}` to JSX attribute string literal value.
* **[Collapse JSX tag](https://p42.ai/documentation/code-assist/collapse-jsx-element)**: Convert an empty JSX tag into a self-closing tag.
* **[Expand JSX tag](https://p42.ai/documentation/code-assist/expand-self-closing-jsx-element)**: Expand a self-closing JSX tag.
* **[Extract React function component](https://p42.ai/documentation/code-assist/extract-jsx-element)**: Extract JSX element or fragment into a React Function Component.
* **[Move JSX attribute](https://p42.ai/documentation/code-assist/move-jsx-attribute) ([Pro](https://p42.ai/pricing))**: Move a JSX attribute up or down.
* **[Remove {…} from JSX attribute](https://p42.ai/documentation/code-assist/remove-braces-from-jsx-attribute)**: Remove `{…}` from a JSX attribute expression value that contains a string literal.
* **[Remove unnecessary JSX fragment](https://p42.ai/documentation/code-assist/remove-unnecessary-jsx-fragment)**: Replace JSX Fragments `<></>` that only contain a single child with that child.
* **[Surround with <>...</>](https://p42.ai/documentation/code-assist/surround-with-jsx-fragment)**: Wrap JSX elements in a JSX fragment `<>...</>`.

## Lodash Modernizations
With the introduction of various collection helpers and new syntax in ES6 and more recent JavaScript versions, some Lodash functions have become somewhat redundant.
* **[Replace _.every with array.every](https://p42.ai/documentation/code-assist/replace-lodash-every-with-javascript-array-every) ([Pro](https://p42.ai/pricing))**: Replace Lodash `_.every` with `array.every`.
* **[Replace _.filter with array.filter](https://p42.ai/documentation/code-assist/replace-lodash-filter-with-javascript-array-filter) ([Pro](https://p42.ai/pricing))**: Replace Lodash `_.filter` with `array.filter`.
* **[Replace _.each and _.forEach with array.forEach](https://p42.ai/documentation/code-assist/replace-lodash-foreach) ([Pro](https://p42.ai/pricing))**: Replace Lodash `_.each` and `_.forEach` with `array.forEach`.
* **[Replace _.map with array.map](https://p42.ai/documentation/code-assist/replace-lodash-map-with-javascript-array-map) ([Pro](https://p42.ai/pricing))**: Replace Lodash `_.map` with `array.map`.
* **[Replace _.noop with arrow Function](https://p42.ai/documentation/code-assist/replace-lodash-noop-with-arrow-function) ([Pro](https://p42.ai/pricing))**: Replace `_.noop` with `() => undefined`.
* **[Replace _.some with array.some](https://p42.ai/documentation/code-assist/replace-lodash-some-with-javascript-array-some) ([Pro](https://p42.ai/pricing))**: Replace Lodash `_.some` with `array.some`.

## Code Assists for Moving Semantic Blocks

* **[Move array element](https://p42.ai/documentation/code-assist/move-array-element)**: Move an array element up or down.
* **[Move class member](https://p42.ai/documentation/code-assist/move-class-member) ([Pro](https://p42.ai/pricing))**: Move a property, constructor, method, etc. up or down.
* **[Move const to top-level scope](https://p42.ai/documentation/code-assist/move-const-to-outer-scope) ([Pro](https://p42.ai/pricing))**: Move a constant to the top-level scope of the module.
* **[Move destructuring array element](https://p42.ai/documentation/code-assist/move-destructured-array-element)**: Move an element inside an array destructuring expression up or down.
* **[Move destructured expression into separate statement](https://p42.ai/documentation/code-assist/move-destructured-expression-into-separate-statement) ([Pro](https://p42.ai/pricing))**: Move a destructured expression inside a variable declaration into a separate variable declaration.
* **[Move destructuring object property](https://p42.ai/documentation/code-assist/move-destructured-object-property)**: Move a property inside an object destructuring expression up or down.
* **[Move field initialization into constructor](https://p42.ai/documentation/code-assist/move-field-initializer-into-constructor) ([Pro](https://p42.ai/pricing))**: Moves the assignment of the initial field value into the class constructor.
* **[Move initialization into field declaration](https://p42.ai/documentation/code-assist/move-field-initializer-into-declaration) ([Pro](https://p42.ai/pricing))**: Moves the assignment of the initial field value into the field declaration.
* **[Move duplicated first statement out of if-else](https://p42.ai/documentation/code-assist/move-first-statement-out-of-if-else)**: Move a first statement that appears in both the if and the else block out of the if-else statement.
* **[Move if-else-if branches](https://p42.ai/documentation/code-assist/move-if-else-if-branches) ([Pro](https://p42.ai/pricing))**: Move an if-else branch up or down.
* **[Move JSX attribute](https://p42.ai/documentation/code-assist/move-jsx-attribute) ([Pro](https://p42.ai/pricing))**: Move a JSX attribute up or down.
* **[Move duplicated last statement out of if-else](https://p42.ai/documentation/code-assist/move-last-statement-out-of-if-else)**: Move a last statement that appears in both the if and the else block out of the if-else statement.
* **[Move nested if](https://p42.ai/documentation/code-assist/move-nested-if)**: Push down if statements into nested if statements and pull nested if statements up.
* **[Move object property](https://p42.ai/documentation/code-assist/move-object-property)**: Move an object property up or down.
* **[Move statement](https://p42.ai/documentation/code-assist/move-statement)**: Move a statement up or down.
* **[Move switch case clause](https://p42.ai/documentation/code-assist/move-switch-case) ([Pro](https://p42.ai/pricing))**: Move a `case` clause in a `switch` statement up or down.
* **[Move variable declaration](https://p42.ai/documentation/code-assist/move-variable-declaration) ([Pro](https://p42.ai/pricing))**: Move a variable declaration up or down.

## Code Cleanups
Code cleanups remove unnecessary code. Such code can result from code churn, e.g., by applying other refactorings, adding new features, or fixing bugs. The JavaScript Assistant shows hints and automates the cleanup for the following situations:
* **[Flatten array rest/spread property](https://p42.ai/documentation/code-assist/flatten-array-rest-property) ([Pro](https://p42.ai/pricing))**: Merge a ...[] expression into the outer array literal or destructuring expression.
* **[Remove console.log](https://p42.ai/documentation/code-assist/remove-console-log)**: Remove console.log statement.
* **[Remove double negation](https://p42.ai/documentation/code-assist/remove-double-negation)**: Remove double negation (`!!`) expressions.
* **[Remove empty else block](https://p42.ai/documentation/code-assist/remove-empty-else-block)**: Remove an empty 'else' block from an 'if' statement.
* **[Remove empty if block](https://p42.ai/documentation/code-assist/remove-empty-if-block)**: Remove an empty 'if' block from an 'if' statement. Replaces it with the 'else' block when available.
* **[Remove IIFE/IIAF](https://p42.ai/documentation/code-assist/remove-iife)**: Remove immediately-invoked function expressions (IIFEs) and immediately-invoked arrow functions (IIAFs) without parameters.
* **[Remove redundant else if](https://p42.ai/documentation/code-assist/remove-redundant-else)**: Remove redundant else-if conditions and unreachable else statements.
* **[Remove trailing array destructuring holes](https://p42.ai/documentation/code-assist/remove-trailing-array-destructuring-holes)**: Remove trailing array destructuring holes and empty array destructuring expressions.
* **[Remove unnecessary conditional expression](https://p42.ai/documentation/code-assist/remove-unnecessary-conditional-expression)**: Replace a conditional expression with its condition or its result.
* **[Remove unnecessary else](https://p42.ai/documentation/code-assist/remove-unnecessary-else)**: Lift the else content of an `if`-`else` with a return statement to the outer indentation level.
* **[Remove unnecessary expression statement](https://p42.ai/documentation/code-assist/remove-unnecessary-expression-statement)**: Remove an expression statement that has no side-effects.
* **[Remove unnecessary JSX fragment](https://p42.ai/documentation/code-assist/remove-unnecessary-jsx-fragment)**: Replace JSX Fragments `<></>` that only contain a single child with that child.
* **[Remove unnecessary template literal](https://p42.ai/documentation/code-assist/remove-unnecessary-template)**: Simplify a template literal with a single inner expression and no prefix or suffix.
* **[Remove unused variable](https://p42.ai/documentation/code-assist/remove-unused-variable)**: Remove a variable that is not read or written.
* **[Replace void 0 with undefined](https://p42.ai/documentation/code-assist/replace-void-0-with-undefined)**: Replace `void 0` and other constant `void` expressions with `undefined`.
* **[Simplify binary expression](https://p42.ai/documentation/code-assist/simplify-binary-expression)**: Replace binary expression with a more straightforward equivalent expression.

## Other Actions

* **[Insert console.log for variable](https://p42.ai/documentation/code-assist/insert-console-log)**: Insert a 'console.log' statement for a selected variable when possible.
* **[Insert else statement](https://p42.ai/documentation/code-assist/insert-else)**: Add an else statement to an existing if statement
* **[Select expression occurrences](https://p42.ai/documentation/code-assist/select-expression-occurrences) ([Pro](https://p42.ai/pricing))**: Start a multi-cursor selection on several occurrences of the same expression.
* **[Surround with if statement](https://p42.ai/documentation/code-assist/surround-with-if-statement)**: Surround a sequence of statements with an if-statement.
* **[Surround with try…catch](https://p42.ai/documentation/code-assist/surround-with-try-catch)**: Surround a sequence of statements with a `try…catch` block.

# Report Bugs and Suggest Features

Please report any bugs or feature suggestions in the **[JavaScript Assistant issue tracker](https://github.com/p42ai/refactor-vscode/issues)**.

# License & Used Open Source Libraries

See [DISCLAIMER.txt](https://raw.githubusercontent.com/p42ai/refactor-vscode/main/DISCLAIMER.txt).
