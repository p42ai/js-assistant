
## Input
```javascript input
!(a || b);
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
  "0-9-PrefixUnaryExpression": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
!a && !b;
```
