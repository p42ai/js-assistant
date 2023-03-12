
## Input
```javascript input
const arrow = (aParameter) => {
  var aConstant = "value";
  return aConstant + aParameter;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
var aConstant = "value";
const arrow = (aParameter) => {
  return aConstant + aParameter;
}
```
