
## Input
```javascript input
function f(a) {
    a = undefined == a ? 2 : a;
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
