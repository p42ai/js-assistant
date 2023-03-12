
## Input
```javascript input
const f = function () {
  console.log("1");
  console.log("2");
  console.log("3");
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
const f = () => {
  console.log("1");
  console.log("2");
  console.log("3");
};
```
