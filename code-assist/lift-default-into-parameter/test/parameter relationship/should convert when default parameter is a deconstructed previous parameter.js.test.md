
## Input
```javascript input
function f({ a }, b) {
    b = b || a;
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
function f({ a }, b = a) {
}
```
