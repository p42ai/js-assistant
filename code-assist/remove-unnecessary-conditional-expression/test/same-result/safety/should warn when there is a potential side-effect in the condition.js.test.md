
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
    "safety": {
      "level": "WARNING",
      "message": "removes condition that could have side-effects"
    }
  }
}
```

## Expected Output
```javascript expected output
const x = b;
```
