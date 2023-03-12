
## Input
```javascript input
value === "a";
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
  "0-13-BinaryExpression": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
["a"].includes(value);
```
