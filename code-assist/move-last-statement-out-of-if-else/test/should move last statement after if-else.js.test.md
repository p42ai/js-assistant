
## Input
```javascript input
if (x()) {
  f1a();
  f2();
} else {
  f1b();
  f2();
}
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
  "0-55-IfStatement": {
    "suggestion": {
      "description": "You can move the duplicated last statement below the if-else statement.",
      "highlightRanges": ["22-27", "48-53"]
    },
    "actionZones": [
      {
        "range": "22-27",
        "label": "Move below if-else",
        "level": "suggestion"
      },
      {
        "range": "48-53",
        "label": "Move below if-else",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (x()) {
  f1a();
} else {
  f1b();
}
f2();
```
