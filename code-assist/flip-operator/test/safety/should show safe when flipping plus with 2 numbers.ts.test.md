
## Input
```javascript input
function f(a: number, b: number) {
  a + b;
}
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
  "34-42-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(a: number, b: number) {
  b + a;
}
```
