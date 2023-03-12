
## Input
```javascript input
(function({ a, b }) {
  b = 123;
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
  let { a, b } = { a: 12, b: 23 };
  b = 123;
  console.log(a);
  console.log(b);
})();
```
