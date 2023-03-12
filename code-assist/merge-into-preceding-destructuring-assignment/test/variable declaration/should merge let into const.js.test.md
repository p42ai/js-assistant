
## Input
```javascript input
const { a } = obj;
let { b } = obj;
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
