
## Input
```javascript input
const f1 = void function (x) {
  return x * x;
};

const f2 = function() {
  console.log("a");
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
const f1 = void ((x) => x * x);

const f2 = () => {
  console.log("a");
};
```
