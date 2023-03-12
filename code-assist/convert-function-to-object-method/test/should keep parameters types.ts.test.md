
## Input
```javascript input
const a = {
  f: function(x: string, y: number, z: boolean) {
    console.log("x");
  }
};
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const a = {
  f(x: string, y: number, z: boolean) {
    console.log("x");
  }
};
```
