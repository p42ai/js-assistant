
## Input
```javascript input
function f(x, a, b) {
  if (x) {
    return x + 2 > 0 ? b : a;
  } else {
    return b;
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
function f(x, a, b) {
  return x ? x + 2 > 0 ? b : a : b;
}
```
