
## Input
```javascript input
const f1 = function () {
  console.log("a"); console.log("b");
};
console.log("x"); console.log("y");
const f2 = function () {
  console.log("a"); console.log("b");
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const f1 = () => {
  console.log("a"); console.log("b");
};
console.log("x"); console.log("y");
const f2 = () => {
  console.log("a"); console.log("b");
};
```
