
## Input
```javascript input
const x = !a ? true : false;
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
    "suggestion": {
      "description": "You can replace the unnecessary conditional expression with its condition."
    }
  }
}
```

## Expected Output
```javascript expected output
const x = !a;
```
