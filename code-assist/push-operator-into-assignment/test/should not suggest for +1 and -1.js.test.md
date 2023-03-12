
## Input
```javascript input
let a = 123;
a = a + 1;
a = a - 1;
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
  "12-22-BinaryExpression": {
    "suggestion": null
  },
  "23-33-BinaryExpression": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
let a = 123;
a += 1;
a -= 1;
```
