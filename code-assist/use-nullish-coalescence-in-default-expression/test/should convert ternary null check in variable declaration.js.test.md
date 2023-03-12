
## Input
```javascript input
const a = x == null ? 123 : x;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = x ?? 123;
```
