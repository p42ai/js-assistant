
## Input
```javascript input
const values = [];
for (let i = 0; i < elements.length; i++) {
  const value = elements[i] ** 2;
  values.push(value);
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
const values = elements.map((element, i) => {
  const value = elements[i] ** 2;
  return value;
});
```
