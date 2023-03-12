
## Input
```javascript input
const a = {
  f: function<T>(x: T) {
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
  f<T>(x: T) {
    console.log("x");
  }
};
```
