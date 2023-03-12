
## Input
```javascript input
var x;
let s = "`" + x;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
var x;
let s = `\`${x}`;
```
