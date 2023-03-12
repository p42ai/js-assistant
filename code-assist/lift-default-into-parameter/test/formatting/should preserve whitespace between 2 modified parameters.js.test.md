
## Input
```javascript input
const x = (a  ,  b) => {
  a = a || 2;
  b = b || 3;
  console.log("x");
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
const x = (a = 2  ,  b = 3) => {
  console.log("x");
};
```
