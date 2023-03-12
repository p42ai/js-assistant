
## Input
```javascript input
const t = `start-${`head${a}middle${b}tail`}-end`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const t = `start-head${a}middle${b}tail-end`;
```
