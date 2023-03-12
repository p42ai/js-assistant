
'x = x || a' is not equal to 'x ||= a' because of short-circuiting.
see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment

This can be an issue if the assignment goes into a setter with side-effects.

## Input
```javascript input
let a = 123;
a ||= x;
a = x || a;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = 123;
a = a || x;
a = x || a;
```
