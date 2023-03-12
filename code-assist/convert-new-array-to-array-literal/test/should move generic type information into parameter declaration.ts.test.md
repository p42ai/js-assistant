
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

## Expected Output
```javascript expected output
function f(anArray: T[] = []) {
}
```
