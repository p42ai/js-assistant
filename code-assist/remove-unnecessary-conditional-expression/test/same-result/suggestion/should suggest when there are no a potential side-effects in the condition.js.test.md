
## Input
```javascript input
const a = value1, b = value2;
const x = a ? b : b;
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
  "39-49-ConditionalExpression": {
    "suggestion": {
      "description": "You can replace the unnecessary conditional expression with its result.",
      "highlightRanges": ["40-41", "44-45", "48-49"]
    }
  }
}
```

## Expected Output
```javascript expected output
const a = value1, b = value2;
const x = b;
```
