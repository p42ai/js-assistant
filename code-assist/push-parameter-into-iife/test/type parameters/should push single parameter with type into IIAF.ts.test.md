
## Input
```javascript input
((a: number) => {
  console.log(a);
})(12);
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
(() => {
  const a: number = 12;
  console.log(a);
})();
```
