
## Input
```javascript input
if (f() === b.x) {
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
  "4-15-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "changes evaluation order"
    }
  }
}
```

## Expected Output
```javascript expected output
if (b.x === f()) {
  f(a);
}
```
