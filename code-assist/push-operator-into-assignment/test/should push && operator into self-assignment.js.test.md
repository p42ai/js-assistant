
'x = x && a' is not equal to 'x &&= a' because of short-circuiting.
See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment

This can be an issue if the assignment goes into a setter with side-effects, therefore it's marked as unsafe.

## Input
```javascript input
let a = 123;
a = a && x;
a = x && a;
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
a &&= x;
a = x && a;
```
