
## Input
```javascript input
const f = function (t) {
  t(async function () {
    console.log("nested async function");
  });
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
const f = (t) => {
  t(async function () {
    console.log("nested async function");
  });
};
```
