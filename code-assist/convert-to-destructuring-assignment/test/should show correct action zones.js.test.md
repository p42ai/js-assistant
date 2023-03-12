
## Input
```javascript input
let something = anObject.something;
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
  "3-34-VariableDeclaration": {
    "actionZones": [
      {
        "range": "4-34",
        "label": "Convert to destructuring",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
let { something } = anObject;
```
