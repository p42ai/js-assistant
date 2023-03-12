
## Input
```javascript input
function f(a, b, c) {
  b = b || 3;
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
function f(a, b = 3, c) {
}
```
