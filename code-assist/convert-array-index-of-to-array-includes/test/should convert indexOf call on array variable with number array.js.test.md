
## Input
```javascript input
const a = [1, 2, 3];
a.indexOf(c) !== -1;
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
  "20-40-BinaryExpression": {
    "suggestion": {},
    "safety": {
      "level": "WARNING",
      "message": "changes behavior for NaN"
    }
  }
}
```

## Expected Output
```javascript expected output
const a = [1, 2, 3];
a.includes(c);
```
