
## Input
```javascript input
const a: Array<number | string> = [1, 2, 3, "4"];
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
  "49-69-BinaryExpression": {
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
const a: Array<number | string> = [1, 2, 3, "4"];
a.includes(c);
```
