
## Input
```javascript input
f() === "a";
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
  "0-11-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
["a"].includes(f());
```
