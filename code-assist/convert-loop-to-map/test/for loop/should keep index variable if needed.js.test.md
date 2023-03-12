
## Input
```javascript input
const values = [];
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
  const value = element * i;
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
  const value = element * i;
  return value;
});
```
