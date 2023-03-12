Default values are only used in place of `undefined`.
The code that is replaced by this refactoring may have provided defaults for falsy or `null` values as well.
This may lead to undesired behavior, for example:

```javascript
function example(x) {
    x = x == null ? "default" : x;
    console.log(x);
}

example(null); // prints "default"
```
becomes
```javascript
function example(x = "default") {
    console.log(x);
}

example(null); // prints "null"
```