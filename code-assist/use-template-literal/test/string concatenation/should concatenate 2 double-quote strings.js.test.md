
## Input
```javascript input
let s = "a" + "b";
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
  "7-17-BinaryExpression": {
    "suggestion": {
      "description": "You can merge a concatenation expression into a single string."
    }
  }
}
```

## Expected Output
```javascript expected output
let s = "ab";
```
