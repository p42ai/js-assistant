
## Input
```javascript input
var a = 1
    // comment
    ,
    b = 2;
var c = 3;

b = b * 2;
console.log(a);
console.log(b);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = 1
    // comment
    ;
let b = 2;
const c = 3;

b = b * 2;
console.log(a);
console.log(b);
```
