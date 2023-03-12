
## Input
```javascript input
const a = value1, b = value2;
const x = a || b ? p : q;
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
  "39-46-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const a = value1, b = value2;
const x = b || a ? p : q;
```
