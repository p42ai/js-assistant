
## Input
```javascript input
function f() {
  if (conditionA) {
    doSomething();
    return;
  }

  if (conditionB) {
    doSomething();
    return;
  }

  doSomethingElse();
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
  "69-125-IfStatement": {
    "actionZones": [
      {
        "range": "73-88",
        "label": "Merge into preceding if-statement",
        "level": "suggestion"
      },
      {
        "range": "73-125",
        "label": "Merge into preceding if-statement",
        "level": "quickFix"
      }
    ],
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can merge this if statement into the preceding one.",
      "highlightRanges": ["21-31", "77-87"]
    }
  }
}
```

## Expected Output
```javascript expected output
function f() {
  if (conditionA || conditionB) {
    doSomething();
    return;
  }

  doSomethingElse();
}
```
