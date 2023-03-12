
## Input
```javascript input
const x = a.f() ? b : b;
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
  "9-23-ConditionalExpression": {
    "suggestion": {
      "description": "You can replace the unnecessary conditional expression with its result.",
      "highlightRanges": ["10-15", "18-19", "22-23"]
    }
  }
}
```

## Expected Output
```javascript expected output
const x = b;
```
