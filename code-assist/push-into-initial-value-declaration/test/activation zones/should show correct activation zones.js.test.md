
## Input
```javascript input
const obj = something;
const aVariable = obj;
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
  "28-44-VariableDeclaration": {
    "actionZones": [
      {
        "range": "29-44",
        "label": "Push into initial value declaration"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const aVariable = something;
```
