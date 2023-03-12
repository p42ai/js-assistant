
## Input
```javascript input
let a = 123;
a -= 4;
a = 4 - a;
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
  "12-19-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "postEditActions": [
      {
        "type": "HIGHLIGHT",
        "highlights": ["15-22"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
let a = 123;
a = a - 4;
a = 4 - a;
```
