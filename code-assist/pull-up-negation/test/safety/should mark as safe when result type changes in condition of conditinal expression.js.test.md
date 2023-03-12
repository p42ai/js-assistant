
## Input
```javascript input
const x = a || b ? q : p;
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
  "9-16-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const x = !(!a && !b) ? q : p;
```
