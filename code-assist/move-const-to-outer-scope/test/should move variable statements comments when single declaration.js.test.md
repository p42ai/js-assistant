
## Input
```javascript input
const arrow = (aParameter) => {
  /*
   * Important const.
   */
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
/*
 * Important const.
 */
const aConstant = "value";
const arrow = (aParameter) => {
  return aConstant + aParameter;
}
```
