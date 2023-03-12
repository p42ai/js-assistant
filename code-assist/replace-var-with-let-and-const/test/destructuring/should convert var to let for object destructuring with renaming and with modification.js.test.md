
## Input
```javascript input
var { x21: y21, x22: y22 } = obj;
y22 = obj;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let { x21: y21, x22: y22 } = obj;
y22 = obj;
```
