
## Input
```javascript input
((a) => {
  console.log(arguments);
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
  console.log(arguments);
})();
```
