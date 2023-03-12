
## Input
```javascript input
var x = "";

function f(b) {
    var x = 3;
    x = x + b;
    console.log(x);
}

console.log(x);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const x = "";

function f(b) {
    let x = 3;
    x = x + b;
    console.log(x);
}

console.log(x);
```
