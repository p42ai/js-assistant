
## Input
```javascript input
function f(x, a, b, c) {
  if (x) {
    return a;
  }
  return x < 2 ? b : c;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
function f(x, a, b, c) {
  return x ? a : x < 2 ? b : c;
}
```
