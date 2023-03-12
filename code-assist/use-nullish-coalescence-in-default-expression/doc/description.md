**The nullish coalescing operator (`??`) returns its right side when its left side is nullish** (`null` or `undefined`), and its left side otherwise.
For example, `const x = a ?? b` would set `x` to `a` if `a` has a value, and to `b` if `a` is `null` or `undefined`.

The nullish coalescing operator is very useful to **provide default values when a value or an expression is nullish**.
Before its introduction in ES2020, this default value pattern was often expressed using the conditional operator.

This refactoring simplifies many types of default value expressions to nullish coalescing operator expressions:

- `a == null ? x : a` becomes `a ?? x`
- `a != null ? a : x` becomes `a ?? x`
- `a !== null && a !== undefined ? a : x` becomes `a ?? x`
- `f(1) != null ? f(1) : x` becomes `f(1) ?? x`
- `if (a != null) { b = a; } else { b = x; }` becomes `b = a ?? x;`
- etc.
