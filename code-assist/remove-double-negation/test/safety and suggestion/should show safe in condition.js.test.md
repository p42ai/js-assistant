
## Input
```javascript input
if (!!a) {
  f();
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
  "4-7-PrefixUnaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
if (a) {
  f();
}
```
