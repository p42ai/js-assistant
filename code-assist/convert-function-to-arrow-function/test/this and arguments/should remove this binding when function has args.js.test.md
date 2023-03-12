
## Input
```javascript input
const f = function (a, b) {
  console.log(a + b);
}.bind(this);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const f = (a, b) => {
  console.log(a + b);
};
```
