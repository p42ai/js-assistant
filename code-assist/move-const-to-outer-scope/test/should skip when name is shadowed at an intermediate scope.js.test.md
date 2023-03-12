
## Input
```javascript input
const arrow = (aParameter) => {
  const aConstant = "something";
  return () => {
    const aConstant = "value";
    return aConstant + aParameter;
  }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "92-92"
}
```
