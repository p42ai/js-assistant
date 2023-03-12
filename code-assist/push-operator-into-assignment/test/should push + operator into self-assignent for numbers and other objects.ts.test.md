
## Input
```javascript input
function f(a: number, b: any) {
  a = a + b;
  a = b + a;
  return a;
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
  "31-43-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
function f(a: number, b: any) {
  a += b;
  a = b + a;
  return a;
}
```
