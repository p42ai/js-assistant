
## Input
```javascript input
const f = function (x) { return x * 2; };
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
  "9-40-FunctionExpression": {
    "suggestion": {
      "description": "You can convert the function expression into an arrow function.",
      "highlightRanges": ["10-22"]
    }
  }
}
```

## Expected Output
```javascript expected output
const f = (x) => x * 2;
```
