
## Input
```javascript input
const a = obj && obj.property;
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
  "9-29-BinaryExpression": {
    "suggestion": {
      "description": "You can replace `obj && obj.property` with optional chaining.",
      "highlightRanges": ["10-29"]
    }
  }
}
```

## Expected Output
```javascript expected output
const a = obj?.property;
```
