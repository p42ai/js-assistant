
## Input
```javascript input
function f(x, y, a, b) {
  let q = 0;
  if (x) {
    q = 1;
  } else if (y) {
    q = a;
  } else {
    q = b;
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
  let q = 0;
  if (x) {
    q = 1;
  } else {
    q = y ? a : b;
  }
}
```
