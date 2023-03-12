
## Input
```javascript input
(function name(a) {
  a = 23;
  console.log(a);
})(12);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
(function name() {
  let a = 12;
  a = 23;
  console.log(a);
})();
```
