
## Input
```javascript input
function f(x, y, a, b) {
  if (x) {
    console.log("x");
  } else if (y) {
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
function f(x, y, a, b) {
  if (x) {
    console.log("x");
  } else return y ? a : b;
}
```
