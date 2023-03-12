When two similar-looking function calls have a side effect, this refactoring can change the behavior of the code.

For example, the refactoring changes:

```javascript
let a = f(1) === null || f(1) === undefined;
```

into

```javascript
let a = f(1) == null;
```

If `f(1)` has a side effect, it would have been called once or twice before the refactoring, and once after the refactoring.
This means that the side effect would have been called a different number of times, potentially changing the behavior.