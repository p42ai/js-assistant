
## Input
```javascript input
function f(anArray = new Array<T>()) {
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
  "20-35-NewExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(anArray: T[] = []) {
}
```
