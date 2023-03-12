
## Input
```javascript input
!(a !== b);
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
    "suggestion": {
      "description": "You can push the negation into the !== operator and convert it into a === operator."
    }
  }
}
```

## Expected Output
```javascript expected output
a === b;
```
