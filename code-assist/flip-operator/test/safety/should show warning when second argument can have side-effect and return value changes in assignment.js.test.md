
## Input
```javascript input
value = a || b.x;
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
  "7-16-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "changes evaluation order; changes short-circuiting result"
    }
  }
}
```

## Expected Output
```javascript expected output
value = b.x || a;
```
