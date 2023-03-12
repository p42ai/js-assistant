
## Input
```javascript input
const a = {
  f: function(x, y, z) {
    console.log("x");
  }
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
const a = {
  f(x, y, z) {
    console.log("x");
  }
};
```
