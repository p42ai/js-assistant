
## Input
```javascript input
function f(x, a, b) {
  if (x) {
    return a;
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
  return x ? a : b;
}
```
