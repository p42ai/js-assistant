
## Input
```javascript input
const knownArray = [value1, value2];
knownArray.filter(aPredicate)[0];
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "36-69-ElementAccessExpression": {
    "safety": {
      "level": "INFORMATION",
      "message": "adds 'undefined' to type"
    }
  }
}
```

## Expected Output
```javascript expected output
const knownArray = [value1, value2];
knownArray.find(aPredicate);
```
