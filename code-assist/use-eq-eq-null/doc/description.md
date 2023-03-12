The `== null` check is a concise expression to identify nullish values (`null` and `undefined`).

This refactoring replaces the following combinations of longer strict equality checks with the shorter `null` comparison:

- `a === null || a === undefined` becomes `a == null`
- `b !== null && b !== undefined` becomes `b != null`
- `x.f(1, 2) === null || x.f(1, 2) === undefined` becomes `x.f(1, 2) == null`
