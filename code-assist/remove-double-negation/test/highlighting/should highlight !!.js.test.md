
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
    "suggestion": {
      "description": "You can remove the double negation.",
      "highlightRanges": ["4-6"]
    }
  }
}
```

## Expected Output
```javascript expected output
if (a) {
  f();
}
```
