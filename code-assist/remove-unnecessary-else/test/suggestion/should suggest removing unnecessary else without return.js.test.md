
## Input
```javascript input
function f() {
    if (a) {
        return fx();
    } else {
        f3();
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
  "14-81-IfStatement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can remove the unnecessary else."
    },
    "actionZones": [
      {
        "range": "55-59",
        "label": "Remove unnecessary else",
        "level": "suggestion"
      },
      {
        "range": "60-81",
        "label": "Remove unnecessary else",
        "level": "preferredQuickFix"
      },
      {
        "range": "19-81",
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
    if (a) {
        return fx();
    }
    f3();
    return f5();
}
```
