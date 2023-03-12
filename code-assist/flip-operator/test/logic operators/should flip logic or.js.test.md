
## Input
```javascript input
const a = value1, b = value2;
if (a || b) {
  f(a);
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "36-36"
}
```

## Expected Matches
```json expected matches
{
  "34-40-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const a = value1, b = value2;
if (b || a) {
  f(a);
}
```
