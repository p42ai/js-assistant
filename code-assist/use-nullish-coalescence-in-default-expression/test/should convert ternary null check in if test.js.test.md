
## Input
```javascript input
if (x == null ? false : x) {
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
