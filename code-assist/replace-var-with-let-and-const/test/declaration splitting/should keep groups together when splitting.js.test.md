
## Input
```javascript input
var a = 1,
    b = 2,
    c = 3,
    d = 4,
    e = 5,
    f = 6;

a++;
b++;
e++;
f++;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = 1,
    b = 2;
const c = 3,
    d = 4;
let e = 5,
    f = 6;

a++;
b++;
e++;
f++;
```
