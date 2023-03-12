
## Input
```javascript input
((a) => {
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
(() => {
  const a = 12;
  console.log(a);
})();
```
