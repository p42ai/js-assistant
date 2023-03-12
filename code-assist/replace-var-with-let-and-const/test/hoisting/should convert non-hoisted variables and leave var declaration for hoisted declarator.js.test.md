
Don't split let, const and var for now. This will need to be updated
when splitting is available.

## Input
```javascript input
a; // hoisted
var a = 2, b = 3, c = 4;

b = b + 2;

console.log(a);
console.log(b);
console.log(c);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
a; // hoisted
var a = 2;
let b = 3;
const c = 4;

b = b + 2;

console.log(a);
console.log(b);
console.log(c);
```
