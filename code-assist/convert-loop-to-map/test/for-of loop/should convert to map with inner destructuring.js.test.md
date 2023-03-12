
## Input
```javascript input
const values = [];
for (const element of elements) {
  const { inner } = element;
  values.push(f(inner));
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
const values = elements.map((element) => {
  const { inner } = element;
  return f(inner);
});
```
