**The optional chaining operator `.?` returns the value of an object property when the object is available and `undefined` otherwise.**
It is similar to the standard `.` chaining operator, with an added check if the object is defined (i.e., not [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish)).

The optional chaining operator lets you **write concise and safe chains of connected objects** when some of those objects can be `null` or `undefined`. Before the introduction of optional chaining in ES2020, the `&&` operator was often used to check if an object is available (`obj && obj.value`).

You can often simplify existing checks with the optional chaining pattern:
- `obj && obj.property` becomes `obj?.property`
- `obj != null && obj.property` becomes `obj?.property`
- `obj != null ? obj.property : undefined` becomes `obj?.property`
- `arr && arr[i]` becomes `arr?.[i]`
- `f && f()` becomes `f?.()`
- etc.
