
## Input
```javascript input
obj.a && obj.a.property;
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
  "0-23-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "changes result for falsy values; can change number of calls with side-effects"
    }
  }
}
```

## Expected Output
```javascript expected output
obj.a?.property;
```
