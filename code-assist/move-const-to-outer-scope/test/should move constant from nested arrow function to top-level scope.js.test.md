
## Input
```javascript input
const arrow = (aParameter) => (anotherParameter) => {
  const aConstant = "value";
  return aConstant + aParameter + anotherParameter;
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
const arrow = (aParameter) => (anotherParameter) => {
  return aConstant + aParameter + anotherParameter;
}
```
