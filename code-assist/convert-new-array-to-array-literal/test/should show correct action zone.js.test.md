
## Input
```javascript input
new Array();
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
  "0-11-NewExpression": {
    "actionZones": [
      {
        "range": "0-11",
        "label": "Convert to […]",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
[];
```
