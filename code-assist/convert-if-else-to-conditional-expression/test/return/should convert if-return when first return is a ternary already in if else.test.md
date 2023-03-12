
## Input
```javascript input
function f(x, a, b, c) {
  if (x) {
    return x < 2 ? a : b;
  } else {
    return c;
  }
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
  return x ? x < 2 ? a : b : c;
}
```
