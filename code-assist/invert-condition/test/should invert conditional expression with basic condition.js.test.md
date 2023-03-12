
## Input
```javascript input
const a = x ? 1 : 2;
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
  "9-19-ConditionalExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const a = !x ? 2 : 1;
```
