
## Input
```javascript input
function f(x, a, b) {
  console.log('a');
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

## Expected Output
```javascript expected output
function f(x, a, b) {
  console.log('a');
  return x ? a : b;
}
```
