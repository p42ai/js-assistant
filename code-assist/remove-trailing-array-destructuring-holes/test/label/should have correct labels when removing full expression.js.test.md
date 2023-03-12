
## Input
```javascript input
const [, , , , , ] = anArray;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
```

## Expected Matches
```json expected matches
{
  "5-18-ArrayBindingPattern": {
    "actionZones": [
      {
        "range": "6-18",
        "label": "Remove empty array destructuring",
        "level": "suggestion"
      }
    ],
    "suggestion": {
      "description": "You can remove the empty array destructuring.",
      "highlightRanges": ["6-18"]
    }
  }
}
```
