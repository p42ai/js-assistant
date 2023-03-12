
## Input
```javascript input
const a = `start-\r\n\b\f\t\v\0\\-${"x"}-\r\n\b\f\t\v\0\\-end`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = `start-\r\n\b\f\t\v\0\\-x-\r\n\b\f\t\v\0\\-end`;
```
