
## Input
```javascript input
const values = [];
for (const element: ElementType of elements) {
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
