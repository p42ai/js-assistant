
## Input
```javascript input
value === "a" || value === "b";
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
  "0-30-BinaryExpression": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
["a", "b"].includes(value);
```
