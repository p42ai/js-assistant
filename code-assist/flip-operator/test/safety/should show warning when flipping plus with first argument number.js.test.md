
## Input
```javascript input
function f(b) {
  2 + b;
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
  "15-23-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "changes result of string concatenation"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(b) {
  b + 2;
}
```
