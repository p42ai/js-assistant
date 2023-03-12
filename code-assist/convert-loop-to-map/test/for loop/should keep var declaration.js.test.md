
## Input
```javascript input
var values = [];
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
var values = elements.map((element, i) => {
  const value = element * i;
  return value;
});
```
