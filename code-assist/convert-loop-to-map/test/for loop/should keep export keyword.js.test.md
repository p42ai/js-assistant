
## Input
```javascript input
export const values = [];
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
export const values = elements.map((element, i) => {
  const value = element * i;
  return value;
});
```
