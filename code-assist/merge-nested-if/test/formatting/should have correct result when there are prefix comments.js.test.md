
## Input
```javascript input
// prefix
if (a) {
  if (b) {
    f();
  }
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
// prefix
if (a && b) {
  f();
}
```
