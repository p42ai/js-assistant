
## Input
```javascript input
const { a: varA } = obj;
const { b: varB } = obj;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { a: varA, b: varB } = obj;
```
