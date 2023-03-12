
## Input
```javascript input
const a = {
  f: function() {
    console.log("x");
  }
};
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
  "11-55-PropertyAssignment": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can convert the function property assignment 'f' into a method declaration.",
      "highlightRanges": ["14-27"]
    },
    "actionZones": [
      {
        "label": "Convert to method declaration"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const a = {
  f() {
    console.log("x");
  }
};
```
