
## Input
```javascript input
const x = (a /* 1 */, /* 2 */ b) => {
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
const x = (a /* 1 */ = 2, /* 2 */ b = 3) => {
  console.log("x");
};
```
