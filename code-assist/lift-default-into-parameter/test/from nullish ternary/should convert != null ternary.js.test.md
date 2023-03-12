
## Input
```javascript input
function f(a) {
    a = a != null ? a : 2;
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
function f(a = 2) {
}
```
