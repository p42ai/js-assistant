
## Input
```javascript input
a && b.x;
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
  "0-8-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "changes evaluation order"
    }
  }
}
```

## Expected Output
```javascript expected output
b.x && a;
```
