
## Input
```javascript input
let y;
const a = typeof a["b" + y] !== 'undefined';

const dummy = "a" + "b";
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let y;
const a = typeof a[`b${y}`] !== 'undefined';

const dummy = "ab";
```
