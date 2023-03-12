
## Input
```javascript input
value === "a" || value === "b" || value === "c";
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
  "0-47-BinaryExpression": {
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
["a", "b", "c"].includes(value);
```
