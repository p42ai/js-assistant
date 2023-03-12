
## Input
```javascript input
const t = `start-${`value`}-end`;
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
  "19-32-TemplateSpan": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can inline '`value`' into the outer template literal.",
      "highlightRanges": ["17-27"]
    },
    "actionZones": [
      {
        "range": "19-26",
        "label": "Inline into template",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const t = `start-value-end`;
```
