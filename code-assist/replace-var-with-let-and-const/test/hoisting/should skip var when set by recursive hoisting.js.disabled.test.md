
## Input
```javascript input
recursiveHoisting();
var setByHoistedFunction;
function recursiveHoisting() {
    setSetByHoistedFunction();
}
function setSetByHoistedFunction() {
    setByHoistedFunction = 10;
}
console.log(setByHoistedFunction);
```
