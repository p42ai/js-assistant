
## Input
```javascript input
function f(x, a, b) {
  if (x) {
    return a;
  } else {
    return b;
  }
  console.log("dead code");
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
  console.log("dead code");
}
```
