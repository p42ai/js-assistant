
## Input
```javascript input
const t = `start-${1 + 2}-${"value"}-${3 + 4}-end`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const t = `start-${1 + 2}-value-${3 + 4}-end`;
```
