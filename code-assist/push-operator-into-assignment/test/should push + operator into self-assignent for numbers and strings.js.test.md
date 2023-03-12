
## Input
```javascript input
let a = 123;
a = a + "4";
a = "4" + a;
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
  "12-24-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {},
    "postEditActions": [
      {
        "type": "HIGHLIGHT",
        "highlights": ["15-17"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
let a = 123;
a += "4";
a = "4" + a;
```
