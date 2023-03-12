
## Input
```javascript input
if (a == 2) {
  f();
} else {
  if (b == 3) {
    f(a, b);
  }
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
  "0-64-IfStatement": {
    "suggestion": {
      "description": "You can merge the nested if statement into an else-if.",
      "highlightRanges": ["23-27", "32-43"]

    },
    "actionZones": [
      {
        "range": "32-34",
        "label": "Merge into else-if",
        "level": "suggestion"
      },
      {
        "range": "23-27",
        "label": "Merge into else-if",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (a == 2) {
  f();
} else if (b == 3) {
  f(a, b);
}
```
