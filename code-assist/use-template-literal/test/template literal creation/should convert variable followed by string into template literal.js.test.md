
## Input
```javascript input
var x;
let s = x + 'a';
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
let s = `${x}a`;
```
