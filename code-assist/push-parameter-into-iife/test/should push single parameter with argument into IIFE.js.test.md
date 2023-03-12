
## Input
```javascript input
(function(a) {
  console.log(a);
})(12);
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
  "10-11-Parameter": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can push the 'a' parameter into the IIFE.",
      "highlightRanges": ["10-11", "36-38"]
    },
    "actionZones": [
      {
        "range": "10-11",
        "label": "Push parameter into IIFE",
        "level": "suggestion"
      },
      {
        "range": "36-38",
        "label": "Push parameter into IIFE",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
(function() {
  const a = 12;
  console.log(a);
})();
```
