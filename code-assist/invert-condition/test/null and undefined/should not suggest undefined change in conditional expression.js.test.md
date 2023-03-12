
## Input
```javascript input
const a = x != undefined ? 1 : 2;
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
  "9-32-ConditionalExpression": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const a = x == undefined ? 2 : 1;
```
