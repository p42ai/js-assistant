
## Input
```javascript input
knownArray.filter(aPredicate)[0];
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
  "0-32-ElementAccessExpression": {
    "safety": {
      "level": "WARNING",
      "message": "target might not be an array"
    }
  }
}
```

## Expected Output
```javascript expected output
knownArray.find(aPredicate);
```
