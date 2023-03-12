
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
  "extension": "js",
  "selection": "41-44"
}
```

## Expected Matches
```json expected matches
{
  "39-59-VariableDeclaration": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["7-10"]
      },
      {
        "type": "HIGHLIGHT",
        "highlights": ["0-26"]
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
