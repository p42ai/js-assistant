
## Input
```javascript input
const a = a || b;
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
  "9-16-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "can change result type to boolean"
    }
  }
}
```

## Expected Output
```javascript expected output
const a = !(!a && !b);
```
