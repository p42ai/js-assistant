
## Input
```javascript input
const t = `start-${"value"}-${1 + 2}-end`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const t = `start-value-${1 + 2}-end`;
```
