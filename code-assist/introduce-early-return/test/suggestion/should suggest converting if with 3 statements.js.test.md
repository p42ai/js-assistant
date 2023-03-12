
## Input
```javascript input
function f() {
    if (a) {
        doSomething();
        doSomethingElse();
        doSomethingElse2();
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
  "14-111-IfStatement": {
    "suggestion": {
      "description": "You can introduce an early return statement.",
      "highlightRanges": ["19-25"]
    },
    "actionZones": [
      {
        "range": "19-25",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
function f() {
    if (!a) {
        return;
    }
    doSomething();
    doSomethingElse();
    doSomethingElse2();
}
```
