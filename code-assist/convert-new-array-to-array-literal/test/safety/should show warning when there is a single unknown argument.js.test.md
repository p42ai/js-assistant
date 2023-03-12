
## Input
```javascript input
new Array(something);
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
  "0-20-NewExpression": {
    "safety": {
      "level": "WARNING",
      "message": "could be single number parameter that specifies array size"
    }
  }
}
```

## Expected Output
```javascript expected output
[something];
```
