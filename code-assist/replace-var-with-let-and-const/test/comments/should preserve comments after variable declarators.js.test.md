
## Input
```javascript input
var a = {}, // comment a
    b = {}, // comment b
    c = {}; // comment c

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
const a = {}, // comment a
    b = {}, // comment b
    c = {}; // comment c

console.log(a);
console.log(b);
console.log(c);
```
