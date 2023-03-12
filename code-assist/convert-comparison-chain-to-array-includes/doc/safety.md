#### The compared expression is only evaluated once

For example, consider refactoring
```javascript
f() === "a" || f() === "b"
```
into
```javascript
["a", "b"].includes(f())
```

Before the refactoring, `f` is called one or two times. After the refactoring (with `.includes()`) `f` is only called once. 

If `f` has a side effect, this side effect would have been called a different number of times, potentially changing the behavior. This behavior applies not just to function and methods calls but also to getters that can potentially have side effects.
