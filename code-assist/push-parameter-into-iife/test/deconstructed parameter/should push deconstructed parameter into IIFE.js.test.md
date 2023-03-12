
## Input
```javascript input
(function({ a, b }) {
  console.log(a);
  console.log(b);
})({ a: 12, b: 23 });
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
  const { a, b } = { a: 12, b: 23 };
  console.log(a);
  console.log(b);
})();
```
