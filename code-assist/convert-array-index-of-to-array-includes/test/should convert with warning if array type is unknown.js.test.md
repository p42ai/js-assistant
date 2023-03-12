
## Input
```javascript input
function f(a) {
  return a.indexOf(c) !== -1;
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
  "24-44-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "'a' might not be an array; changes behavior for NaN"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
function f(a) {
  return a.includes(c);
}
```
