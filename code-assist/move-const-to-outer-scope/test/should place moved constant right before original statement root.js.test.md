
## Input
```javascript input
const somethingElse = a + b;
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
const somethingElse = a + b;
const aConstant = "value";
const arrow = (aParameter) => {
  return aConstant + aParameter;
}
```
