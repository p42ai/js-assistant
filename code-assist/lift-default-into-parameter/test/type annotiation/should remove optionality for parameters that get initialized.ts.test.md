
## Input
```javascript input
function f(a?: number) {
    a = a ? a : 4;
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
function f(a: number = 4) {
}
```
