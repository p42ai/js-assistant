
## Input
```javascript input
function f(a: boolean, b = false) {
  return !a || !b;
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "44-53-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(a: boolean, b = false) {
  return !(a && b);
}
```
