
## Input
```javascript input
var querySet = {};
if (true) {
    ([querySet] = someComputation());
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
let querySet = {};
if (true) {
    ([querySet] = someComputation());
}
```
