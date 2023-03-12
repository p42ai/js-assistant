
## Input
```javascript input
const a: Array<any> = [1, "2", 3];
a.indexOf(NaN) !== -1;
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
  "34-56-BinaryExpression": {
    "suggestion": null,
    "safety": {
      "level": "ERROR",
      "message": "changes behavior for NaN"
    }
  }
}
```

## Expected Output
```javascript expected output
const a: Array<any> = [1, "2", 3];
a.includes(NaN);
```
