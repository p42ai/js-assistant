
## Input
```javascript input
function f(anArray: S[] = new Array<T>()) {
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
  "25-40-NewExpression": {
    "safety": {
      "level": "INFORMATION",
      "message": "removes generic type"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(anArray: S[] = []) {
}
```
