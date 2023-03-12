
## Input
```javascript input
new Array(123);
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
  "0-14-NewExpression": {
    "safety": {
      "level": "ERROR",
      "message": "single number parameter specifies array size"
    }
  }
}
```

## Expected Output
```javascript expected output
[123];
```
