
## Input
```javascript input
const t = `start-${`\r\n\b\f\t\v\0\\`}-end`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const t = `start-\r\n\b\f\t\v\0\\-end`;
```
