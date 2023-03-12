
## Input
```javascript input
if (x == void 0 ? false : x) {
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
if (x ?? false) {
};
```
