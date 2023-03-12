
## Input
```javascript input
console.log(a);

var a = 1, // comment a
    b = 2, // comment b
    c = 3; // comment c

b++;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
console.log(a);

var a = 1; // comment a
let b = 2; // comment b
const c = 3; // comment c

b++;
```
