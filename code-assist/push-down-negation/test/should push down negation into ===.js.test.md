
## Input
```javascript input
!(a === b);
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
  "0-10-PrefixUnaryExpression": {
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
a !== b;
```
