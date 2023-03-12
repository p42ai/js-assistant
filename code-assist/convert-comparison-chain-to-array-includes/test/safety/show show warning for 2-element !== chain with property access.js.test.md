
## Input
```javascript input
function f(obj) {
  obj.property !== "a" && obj.property !== "b";
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
  "17-64-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "evaluates expression only once"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(obj) {
  !["a", "b"].includes(obj.property);
}
```
