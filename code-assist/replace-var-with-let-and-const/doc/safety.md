Top-level `var` declarations can define global variables visible in other files and script sections in some environments.

Most environments (e.g., [Node.js](https://nodejs.org/api/modules.html#the-module-wrapper)), [TypeScript code generation](https://www.typescriptlang.org/docs/handbook/modules.html#code-generation-for-modules), bundling, and [ECMAScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) prevent this behavior and expect you to use `globalThis` or its variants to define a global variable.

However, when you directly include scripts in the browser using the script tag (`<script src="a-script.js"></script>`), `var` could define globals, and converting to `let` or `const` could break your code.