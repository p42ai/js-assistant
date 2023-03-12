
## Input
```javascript input
const a = x === null || x === undefined ? 1 : 2;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = x == null ? 1 : 2;
```
