
## Input
```javascript input
var mutatedInAFunction = 10;
function mutateMutatedInAFunction() {
  mutatedInAFunction = 20;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let mutatedInAFunction = 10;
function mutateMutatedInAFunction() {
  mutatedInAFunction = 20;
}
```
