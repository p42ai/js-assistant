
## Input
```javascript input
const b = [1, 2, 3].indexOf(c) !== -1;
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
  "9-37-BinaryExpression": {
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
const b = [1, 2, 3].includes(c);
```
