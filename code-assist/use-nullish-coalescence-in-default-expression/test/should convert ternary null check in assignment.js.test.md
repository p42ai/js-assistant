
## Input
```javascript input
const x = value;
a = x == null ? 123 : x;
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
  "20-40-ConditionalExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const x = value;
a = x ?? 123;
```
