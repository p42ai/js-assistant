
## Input
```javascript input
const x = (a) => {
  a = a || 2;
};
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
  "11-12-Parameter": {
    "suggestion": {
      "description": "You can lift the default value 'a = a || 2;' into the parameter.",
      "highlightRanges": ["11-12", "21-32"]
    },
    "actionZones": [
      {
        "range": "21-32",
        "label": "Lift default into parameter",
        "level": "suggestion"
      },
      {
        "range": "11-12",
        "label": "Lift default into parameter",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const x = (a = 2) => {
};
```
