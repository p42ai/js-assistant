
## Input
```javascript input
if (conditionA) {
    if (conditionB) {
        doSomething();
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
  "0-70-IfStatement": {
    "actionZones": [
      {
        "range": "0-15",
        "label": "Push into nested if",
        "level": "quickFix",
        "kind": "refactor.move.push-into-nested-if.p42"
      },
      {
        "range": "22-37",
        "label": "Pull up nested if",
        "level": "quickFix",
        "kind": "refactor.move.pull-up-nested-if.p42"
      }
    ],
    "postEditActions": [
      {
        "type": "HIGHLIGHT",
        "highlights": ["4-14", "26-36"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (conditionB) {
    if (conditionA) {
        doSomething();
    }
}
```
