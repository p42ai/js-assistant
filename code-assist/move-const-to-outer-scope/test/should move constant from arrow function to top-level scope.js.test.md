
## Input
```javascript input
const arrow = (aParameter) => {
  const aConstant = "value";
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
const aConstant = "value";
const arrow = (aParameter) => {
  return aConstant + aParameter;
}
```
