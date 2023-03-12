
## Input
```javascript input
var a = 1;
(() => {
  return (_ = (_) => (_) => (_) => (_) => (_) => {
    a = 2;
  });
})();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = 1;
(() => {
  return (_ = (_) => (_) => (_) => (_) => (_) => {
    a = 2;
  });
})();
```
