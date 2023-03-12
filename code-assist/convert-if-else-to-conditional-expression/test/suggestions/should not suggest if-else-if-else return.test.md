
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

## Expected Matches
```json expected matches
{
  "66-118-IfStatement": {
    "suggestion": null
  }
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
