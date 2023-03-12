
## Input
```javascript input
function f(x, a, b) {
  if (x) {
    return b;
  } else {
    return x + 2 > 0 ? b : a;
  }
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
  "21-91-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
function f(x, a, b) {
  return x ? b : x + 2 > 0 ? b : a;
}
```
