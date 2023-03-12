
## Input
```javascript input
function f(a) {
    a = a === undefined || a === null ? 2 : a;
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
