
## Input
```javascript input
if (condition) {
    doSomething();
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
  "0-37-IfStatement": {
    "suggestion": null,
    "actionZones": [
      {
        "range": "0-37",
        "level": "regular"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["49-49"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (condition) {
    doSomething();
} else {
    
}
```
