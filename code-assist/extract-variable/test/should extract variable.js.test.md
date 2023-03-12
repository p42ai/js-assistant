
## Input
```javascript input
let x = "1234";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "8-14"
}
```

## Expected Matches
```json expected matches
{
  "7-14-StringLiteral": {
    "actionZones": [
      {
        "range": "8-14",
        "label": "Extract const",
        "level": "preferredQuickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const newVariable = "1234";
let x = newVariable;
```
