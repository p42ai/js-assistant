
## Input
```javascript input
const { aProperty1, aProperty2 } = anObject;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "20-20"
}
```

## Expected Matches
```json expected matches
{
  "19-30-BindingElement": {
    "actionZones": [
      {
        "range": "20-30",
        "label": "Extract into separate variable declaration",
        "level": "quickFix"
      }
    ],
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const { aProperty1, } = anObject;
const aProperty2 = anObject.aProperty2;
```
