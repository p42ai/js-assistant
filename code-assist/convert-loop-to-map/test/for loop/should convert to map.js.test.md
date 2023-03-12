
## Input
```javascript input
const values = [];
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
  values.push(f(element));
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
  return f(element);
});
```
