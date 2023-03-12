
## Input
```javascript input
var x, y, z;
let s = 'a' + 'b' + (x * y) + 'c' + z + "d" + "e";
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
var x, y, z;
let s = `ab${x * y}c${z}de`;
```
