
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

## Expected Matches
```json expected matches
{
  "39-59-VariableDeclaration": {
    "actionZones": [
      {
        "range": "40-59",
        "label": "Move to top-level scope",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const aConstant = "value";
const arrow = (aParameter) => {
  return aConstant + aParameter;
}
```
