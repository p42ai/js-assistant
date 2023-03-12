
## Input
```javascript input
obj && obj.property;
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
  "0-19-BinaryExpression": {
    "actionZones": [
      {
        "range": "0-19",
        "label": "Convert to optional chaining",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
obj?.property;
```
