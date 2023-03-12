
## Input
```javascript input
const arrow = (aParameter) => {
  let aConstant = "value";
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
let aConstant = "value";
const arrow = (aParameter) => {
  return aConstant + aParameter;
}
```
