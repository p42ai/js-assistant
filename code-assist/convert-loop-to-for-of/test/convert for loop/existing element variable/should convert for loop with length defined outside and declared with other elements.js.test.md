
## Input
```javascript input
const n = elements.length,
      x = y;

for (let i = 0; i < n; i++) {
  const element = elements[i];
  console.log(element);
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const x = y;

for (const element of elements) {
  console.log(element);
}
```
