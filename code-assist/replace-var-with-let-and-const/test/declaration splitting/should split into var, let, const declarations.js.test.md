
## Input
```javascript input
console.log(a);

var a = 1,
    b = 2,
    c = 3;

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

var a = 1;
let b = 2;
const c = 3;

b++;
```
