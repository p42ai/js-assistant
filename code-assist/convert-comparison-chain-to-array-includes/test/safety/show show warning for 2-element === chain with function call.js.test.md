
## Input
```javascript input
function f(f) {
  f() === "a" || f() === "b";
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
  "15-44-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "evaluates expression only once"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(f) {
  ["a", "b"].includes(f());
}
```
