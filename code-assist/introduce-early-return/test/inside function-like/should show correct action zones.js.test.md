
## Input
```javascript input
function f() {
    if (a) {
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
  "14-56-IfStatement": {
    "actionZones": [
      {
        "range": "19-25",
        "label": "Introduce early return"
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
}
```
