
## Input
```javascript input
const x = ((a) => a * 2)(12);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const x = (() => {
  const a = 12;
  return a * 2;
})();
```
