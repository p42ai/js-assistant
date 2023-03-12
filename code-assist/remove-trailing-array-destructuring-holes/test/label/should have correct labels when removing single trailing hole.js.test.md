
## Input
```javascript input
const [a, b, , ] = anArray;
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
  "5-16-ArrayBindingPattern": {
    "actionZones": [
      {
        "range": "6-16",
        "label": "Remove trailing holes",
        "level": "suggestion"
      }
    ],
    "suggestion": {
      "description": "You can remove the trailing holes in the array destructuring.",
      "highlightRanges": ["6-16"]
    }
  }
}
```

## Expected Output
```javascript expected output
const [a, b, ] = anArray;
```
