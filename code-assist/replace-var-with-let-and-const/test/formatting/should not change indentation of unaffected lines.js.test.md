
## Input
```javascript input
const a = 1,
      b = 2;
var c;

c = 3;
console
  .log(a);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = 1,
      b = 2;
let c;

c = 3;
console
  .log(a);
```
