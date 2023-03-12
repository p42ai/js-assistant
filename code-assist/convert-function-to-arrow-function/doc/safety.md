Anonymous functions are converted into arrow functions unless there is direct usage of `this`, `arguments`, etc.
The replaced functions might be used in other parts of the codebase in ways that are incompatible with arrow functions, for example:

* as methods
* as constructors
* with `bind`, `apply`, or `call`

In those cases, changing them into arrow functions may lead to undesired behavior and errors at runtime.
However, this refactoring does not convert functions that have reference to `this`, unless they are immediately bound, and will therefore prevent many of those errors.

```javascript
const f = function() {
    console.log("my function");
};

// problematic usages of 'f' that do not work with arrow functions somewhere else
// in the code, potentially in a different module:
const example1 = new f()
const example2 = {
    exampleMethod: f
};
const example3 = f.bind(this);
```