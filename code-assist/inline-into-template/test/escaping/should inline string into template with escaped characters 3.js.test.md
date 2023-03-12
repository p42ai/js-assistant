
## Input
```javascript input
const c = `start-${1 + 2}-\r\n\b\f\t\v\0\\-${"x"}-\r\n\b\f\t\v\0\\-${1 + 2}-end`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const c = `start-${1 + 2}-\r\n\b\f\t\v\0\\-x-\r\n\b\f\t\v\0\\-${1 + 2}-end`;
```
