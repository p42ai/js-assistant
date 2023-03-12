
## Input
```javascript input
function f(a, b) {
  a + b;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "18-26-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "changes result of string concatenation"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(a, b) {
  b + a;
}
```
