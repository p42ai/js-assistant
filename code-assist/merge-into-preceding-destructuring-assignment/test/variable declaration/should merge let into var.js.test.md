
## Input
```javascript input
var { a } = obj;
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
var { a, b } = obj;
```
