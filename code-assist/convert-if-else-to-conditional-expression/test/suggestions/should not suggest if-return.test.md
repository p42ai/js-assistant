
## Input
```javascript input
function f(x, a, b) {
  if (x) {
    return a;
  }
  return b;
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
  "19-64-Block": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
function f(x, a, b) {
  return x ? a : b;
}
```
