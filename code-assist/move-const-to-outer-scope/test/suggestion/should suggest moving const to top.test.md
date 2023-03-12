
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
    "suggestion": {
      "description": "You can move 'aConstant' to the top level.",
      "highlightRanges": ["40-59"]
    }
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
