
## Input
```javascript input
const x = !!a;
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
  "9-13-PrefixUnaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "removes conversion to boolean"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const x = a;
```
