
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
  "extension": "js",
  "selection": "26-29"
}
```

## Expected Matches
```json expected matches
{
  "0-70-IfStatement": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["4-7"]
      },
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
