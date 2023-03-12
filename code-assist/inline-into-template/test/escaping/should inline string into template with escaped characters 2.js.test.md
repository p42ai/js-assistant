
## Input
```javascript input
const b = `start-${1 + 2}-\r\n\b\f\t\v\0\\-${"x"}-\r\n\b\f\t\v\0\\-end`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const b = `start-${1 + 2}-\r\n\b\f\t\v\0\\-x-\r\n\b\f\t\v\0\\-end`;
```
