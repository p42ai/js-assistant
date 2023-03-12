
## Input
```javascript input
anArray.filter(aPredicate)[0];
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
  "0-29-ElementAccessExpression": {
    "suggestion": {
      "description": "You can convert a '.filter' expression to '.find'.",
      "highlightRanges": ["8-14", "26-29"]
    },
    "actionZones": [
      {
        "range": "0-29",
        "label": "Convert to .find",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
anArray.find(aPredicate);
```
