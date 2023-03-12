
## Input
```javascript input
const a = x != null ? 1 : 2;
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
  "9-27-ConditionalExpression": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const a = x == null ? 2 : 1;
```
