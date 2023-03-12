
## Input
```javascript input
function (obj) {
  obj && obj.property;
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
  "16-38-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "changes result for falsy values"
    }
  }
}
```

## Expected Output
```javascript expected output
function (obj) {
  obj?.property;
}
```
