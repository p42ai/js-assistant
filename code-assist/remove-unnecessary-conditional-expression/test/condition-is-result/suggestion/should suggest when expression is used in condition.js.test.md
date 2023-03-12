
## Input
```javascript input
if (a ? true : false) {
}
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
  "4-20-ConditionalExpression": {
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
if (a) {
}
```
