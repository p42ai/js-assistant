
## Input
```javascript input
const values = [];
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
  const value = element ** 2;
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
const values = elements.map((element) => {
  const value = element ** 2;
  return value;
});
```
