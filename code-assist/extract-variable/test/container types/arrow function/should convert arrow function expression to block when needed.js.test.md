
## Input
```javascript input
const arrowFunction = (aParameter) => aParameter * aParameter;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "38-61"
}
```

## Expected Output
```javascript expected output
const arrowFunction = (aParameter) => {
  const newVariable = aParameter * aParameter;
  return newVariable;
};
```
