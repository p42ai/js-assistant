
## Input
```javascript input
function f() {
    f1();
    f2();
    if (a) {
        return fx();
    } else {
        f3();
        f4();
    }
    return f5();
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
  "34-115-IfStatement": {
    "suggestion": {
      "description": "You can remove the unnecessary else.",
      "highlightRanges": ["75-79"]
    },
    "actionZones": [
      {
        "range": "75-79",
        "label": "Remove unnecessary else",
        "level": "suggestion"
      },
      {
        "range": "80-115",
        "label": "Remove unnecessary else",
        "level": "preferredQuickFix"
      },
      {
        "range": "39-115",
        "label": "Remove unnecessary else",
        "level": "regular"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
function f() {
    f1();
    f2();
    if (a) {
        return fx();
    }
    f3();
    f4();
    return f5();
}
```
