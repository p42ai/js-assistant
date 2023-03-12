
## Input
```javascript input
const f = function (x = 10) { return x * 2; };
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const f = (x = 10) => x * 2;
```
