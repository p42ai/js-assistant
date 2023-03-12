
## Input
```javascript input
const knownArray = [value1, value2];
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
  "36-69-ElementAccessExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const knownArray = [value1, value2];
knownArray.find(aPredicate);
```
