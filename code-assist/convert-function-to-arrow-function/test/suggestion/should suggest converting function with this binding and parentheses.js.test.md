
## Input
```javascript input
const f = (function () {}).bind(this);
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
  "9-37-CallExpression": {
    "suggestion": {
      "description": "You can convert the function expression into an arrow function.",
      "highlightRanges": ["10-22", "26-37"]
    }
  }
}
```

## Expected Output
```javascript expected output
const f = () => {};
```
