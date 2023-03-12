
## Input
```javascript input
// should not destroy comments
var a = {};
console.log(a);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
// should not destroy comments
const a = {};
console.log(a);
```
