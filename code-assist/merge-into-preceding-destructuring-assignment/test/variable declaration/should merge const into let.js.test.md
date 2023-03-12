
## Input
```javascript input
let { a } = obj;
const { b } = obj;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let { a, b } = obj;
```
