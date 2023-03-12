IIFEs are common in older JavaScript code (pre-ES6).
Before ES6, there were only `var` variable declarations and function declarations.
IIFEs were used to create closures that prevent `var` and `function` declarations from affecting the global scope and prevent conflicts between different scripts and libraries using the same variable names.

With ES6, using block-scoped variable declared with `let` and `const` is preferable, and together with arrow functions, most IIFEs can be removed.
Removing IIFEs can often simplify the code and make it more readable.