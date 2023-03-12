
## Input
```javascript input
with (a) {
    var x = a.x;
}
var y;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
with (a) {
    const x = a.x;
}
let y;
```
