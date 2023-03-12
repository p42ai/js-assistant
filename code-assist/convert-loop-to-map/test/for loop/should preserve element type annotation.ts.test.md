
## Input
```javascript input
const values = [];
for (let i = 0; i < elements.length; i++) {
  const element: ElementType = elements[i];
  values.push(f(element));
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const values = elements.map((element: ElementType) => {
  return f(element);
});
```
