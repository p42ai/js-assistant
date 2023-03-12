
## Input
```javascript input
var x: number = 4, y: number = 5;
let s = "a" + x + y;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
var x: number = 4, y: number = 5;
let s = `a${x}${y}`;
```
