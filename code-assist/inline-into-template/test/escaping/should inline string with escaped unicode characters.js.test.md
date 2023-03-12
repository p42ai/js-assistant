
## Input
```javascript input
const t = `start-${"💩 \u{1F4A9}"}-end`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const t = `start-💩 \u{1F4A9}-end`;
```
