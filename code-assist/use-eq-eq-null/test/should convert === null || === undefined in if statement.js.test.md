
## Input
```javascript input
if (x === null || x === undefined) {
  f(x);
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
if (x == null) {
  f(x);
}
```
