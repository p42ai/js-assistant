
## Input
```javascript input
for (const element: ElementType of elements) {
  console.log(element);
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
for (let i = 0; i < elements.length; i++) {
  const element: ElementType = elements[i];
  console.log(element);
}
```
