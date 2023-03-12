
## Input
```javascript input
fake.recursiveHoisting();
var setByHoistedFunction;
function setSetByHoistedFunction() {
    setByHoistedFunction = 10;
}
console.log(setByHoistedFunction);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
fake.recursiveHoisting();
let setByHoistedFunction;
function setSetByHoistedFunction() {
    setByHoistedFunction = 10;
}
console.log(setByHoistedFunction);
```
