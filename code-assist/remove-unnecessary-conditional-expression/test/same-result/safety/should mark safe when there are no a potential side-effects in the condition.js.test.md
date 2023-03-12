
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
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const a = value1, b = value2;
const x = b;
```
