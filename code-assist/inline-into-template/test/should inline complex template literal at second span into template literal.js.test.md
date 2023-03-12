
## Input
```javascript input
const t = `start-${x}-${`head${a}middle${b}tail`}-${y}-end`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "24-24"
}
```

## Expected Output
```javascript expected output
const t = `start-${x}-head${a}middle${b}tail-${y}-end`;
```
