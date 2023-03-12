
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
  "extension": "js",
  "selection": "124-127"
}
```

## Expected Matches
```json expected matches
{
  "0-206-IfStatement": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["4-7"]
      },
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
