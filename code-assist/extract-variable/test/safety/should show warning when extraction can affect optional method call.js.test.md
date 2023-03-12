
## Input
```javascript input
obj.f?.();
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-5"
}
```

## Expected Matches
```json expected matches
{
  "0-5-PropertyAccessExpression": {
    "safety": {
      "level": "WARNING",
      "message": "changes 'this' in a method call to the global object"
    }
  }
}
```

## Expected Output
```javascript expected output
const f = obj.f;
f?.();
```
