
## Input
```javascript input
const arrow = (aParameter) => {
  const aValue1 = f(),
        aConstant = "value",
        aValue2 = g();
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
  const aValue1 = f(),
        aValue2 = g();
  return aConstant + aParameter;
}
```
