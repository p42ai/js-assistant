
## Input
```javascript input
const f = function () { return 1; }();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const f = (() => 1)();
```
