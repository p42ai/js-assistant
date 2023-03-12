
## Input
```javascript input
const q = () => {
  let a;
  console.log("x");
  console.log("y");
  a = f();
  return a;
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
const q = () => {
  console.log("x");
  console.log("y");
  return f();
};
```
