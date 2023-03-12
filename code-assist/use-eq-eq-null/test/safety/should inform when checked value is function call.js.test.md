
## Input
```javascript input
const a = f() === null || f() === undefined;
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
  "9-43-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "could change number of function or getter calls"
    }
  }
}
```

## Expected Output
```javascript expected output
const a = f() == null;
```
