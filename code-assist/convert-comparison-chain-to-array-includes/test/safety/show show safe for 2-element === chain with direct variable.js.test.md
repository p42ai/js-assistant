
## Input
```javascript input
function f(value) {
  value === "a" || value === "b";
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
  "19-52-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(value) {
  ["a", "b"].includes(value);
}
```
