
## Input
```javascript input
const a: number[] = [1, 2, 3];
a.indexOf(c) !== -1;
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
  "30-50-BinaryExpression": {
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
const a: number[] = [1, 2, 3];
a.includes(c);
```
