
## Input
```javascript input
function g() {
  let a = 123;
  if (x) {
    a = f();
  }
  return a;
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
function g() {
  if (x) {
    return f();
  }
  return 123;
};
```
