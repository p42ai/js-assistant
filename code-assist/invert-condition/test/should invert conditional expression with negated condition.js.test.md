
## Input
```javascript input
const a = !x ? 1 : 2;
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
  "9-20-ConditionalExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can invert the condition '!x' and swap the expressions.",
      "highlightRanges": ["10-12"]
    }
  }
}
```

## Expected Output
```javascript expected output
const a = x ? 2 : 1;
```
