
## Input
```javascript input
let a = "x";
a = a + 4;
a = 4 + a;
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
  "12-22-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
let a = "x";
a += 4;
a = 4 + a;
```
