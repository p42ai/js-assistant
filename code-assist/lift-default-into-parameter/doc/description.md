**Default parameters allow providing default values for function parameters. These default values are used if nothing or `undefined` is passed into the function.**
For example, `function f(p = 42) { ... }` sets `p` to `42` if no value is passed in.

Previous ways of setting default values, for example `p = p || 42` can be converted to default parameters.
This refactoring supports converting the following expressions and variants of them:

- or assignment, e.g. `p = p || 42` or `p ||= 42`
- nullish coalescing operator, e.g. `p = p ?? 42`
- ternary with falsy check on parameter, e.g. `p = p ? p : 42`
- ternary with `null` check, e.g. `p = p == null ? 42 : p` or `p = p != null ? p : 42`
- ternary with `undefined` check, e.g. `p = p === undefined ? 42 : p`
- ternary with `typeof` check, e.g. `p = typeof p === "undefined" ? 42 : p`
