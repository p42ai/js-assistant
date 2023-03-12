
## Input
```javascript input
function g(c) {
  let a = 123;
  if (x) {
    f();
    c = a;
  }
  return c;
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
function g(c) {
  let a = 123;
  if (x) {
    f();
    return a;
  }
  return c;
}
```
