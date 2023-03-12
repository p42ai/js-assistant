
## Input
```javascript input
(function(a) {
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
(function() {
  let a = 12;
  a = 23;
  console.log(a);
})();
```
