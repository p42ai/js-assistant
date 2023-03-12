
## Input
```javascript input
var x, y;
let s = 'a' + (x * y);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
var x, y;
let s = `a${x * y}`;
```
