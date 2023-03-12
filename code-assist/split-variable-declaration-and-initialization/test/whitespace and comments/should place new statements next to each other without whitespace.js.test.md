
## Input
```javascript input
console.log("a");


let f = "123";



f *= x ? a : b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
console.log("a");


let f;
f = "123";



f *= x ? a : b;
```
