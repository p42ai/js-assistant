
## Input
```javascript input
var z = 10;
do {
    var a = 0;
    var b = 1;
    a += b;
    console.log(a, b);
} while (z--);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let z = 10;
do {
    let a = 0;
    const b = 1;
    a += b;
    console.log(a, b);
} while (z--);
```
