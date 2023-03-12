
## Input
```javascript input
function f(a, b, c) {
    a = a == null ? "test" : a;
    b = b == null ? {} : b;
    c = c == null ? [] : c;
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
