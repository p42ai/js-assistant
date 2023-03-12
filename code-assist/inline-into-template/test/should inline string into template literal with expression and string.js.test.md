
## Input
```javascript input
const t = `start-${1 + 2}-${"value"}-end`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const t = `start-${1 + 2}-value-end`;
```
