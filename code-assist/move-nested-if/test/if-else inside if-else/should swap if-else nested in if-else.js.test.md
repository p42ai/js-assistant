
## Input
```javascript input
if (conditionA) {
    if (conditionB) {
        doSomething1();
    } else {
        doSomething2();
    }
} else {
    if (conditionB) {
        doSomething3();
    } else {
        doSomething4();
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
  "0-206-IfStatement": {
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
      },
      {
        "range": "120-135",
        "label": "Pull up nested if",
        "level": "quickFix",
        "kind": "refactor.move.pull-up-nested-if.p42"
      }
    ],
    "postEditActions": [
      {
        "type": "HIGHLIGHT",
        "highlights": ["4-14", "26-36", "124-134"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (conditionB) {
    if (conditionA) {
        doSomething1();
    } else {
        doSomething3();
    }
} else {
    if (conditionA) {
        doSomething2();
    } else {
        doSomething4();
    }
}
```
