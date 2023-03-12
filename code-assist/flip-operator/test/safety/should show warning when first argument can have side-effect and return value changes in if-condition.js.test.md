
## Input
```javascript input
if (a.x || b) {
  f(a);
}
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
  "4-12-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "changes evaluation order"
    }
  }
}
```

## Expected Output
```javascript expected output
if (b || a.x) {
  f(a);
}
```
