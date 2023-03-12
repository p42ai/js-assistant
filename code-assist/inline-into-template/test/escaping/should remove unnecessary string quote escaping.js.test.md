
## Input
```javascript input
const t = `start-${"\""}-end`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const t = `start-"-end`;
```
