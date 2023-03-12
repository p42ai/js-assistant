**Arrow functions are a concise syntax that can often replace the regular function syntax.**
For example, `function(x, y) { return x * y }` can be replaced with `(x, y) => { return x * y; }`.

However, arrow functions have different semantics and cannot replace regular functions in all cases.
In particular, the scope of arrow functions (including binding of `this`) is established at creation time.
This difference makes arrow functions unsuitable for using them as methods, constructors, and in `call`, `apply`, and `bind` calls.
