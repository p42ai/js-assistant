
## Input
```javascript input
const [...[variableA]] = something();
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
  "7-21-BindingElement": {
    "suggestion": {
      "description": "You can flatten the ...[] expression into the outer [].",
      "highlightRanges": ["7-11", "20-21"]
    },
    "actionZones": [
      {
        "range": "7-11",
        "label": "Flatten ...[]",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const [variableA] = something();
```
