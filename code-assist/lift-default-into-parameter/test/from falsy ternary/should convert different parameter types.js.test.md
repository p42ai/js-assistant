
## Input
```javascript input
function f(a, b, c) {
    a = a ? a : "test";
    b = b ? b : {};
    c = c ? c : [];
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
function f(a = "test", b = {}, c = []) {
}
```
